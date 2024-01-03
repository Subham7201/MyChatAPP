const express = require('express');
const jwt = require('jsonwebtoken')
const User = require('../models/User');
const bcrypt = require('bcryptjs')
// const { getUserDataFromRequest } = require('../middlewares/authMiddleware');

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET;
const bcryptSalt = bcrypt.genSaltSync(10);

// Get a list of users
router.get('/people', async (req, res) => {
    const users = await User.find({}, { '_id': 1, username: 1 });
    res.json(users);
});

// Get user profile
router.get('/profile', (req, res) => {
    const token = req.cookies?.token;
    if (token) {
        jwt.verify(token, jwtSecret, {}, (err, userData) => {
            if (err) throw err;
            res.json(userData);
        });
    } else {
        res.status(401).json('no token');
    }
});

// User login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await User.findOne({ username });
    if (foundUser) {
        const passOk = bcrypt.compareSync(password, foundUser.password);
        if (passOk) {
            jwt.sign({ userId: foundUser._id, username }, jwtSecret, {}, (err, token) => {
                res.cookie('token', token, { sameSite: 'none', secure: true }).json({
                    id: foundUser._id,
                });
            });
        }
    }
});

// User logout
router.post('/logout', (req, res) => {
    res.cookie('token', '', { sameSite: 'none', secure: true }).json('ok');
});

// User registration
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
        const createdUser = await User.create({
            username: username,
            password: hashedPassword,
        });
        jwt.sign({ userId: createdUser._id, username }, jwtSecret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token, { sameSite: 'none', secure: true }).status(201).json({
                id: createdUser._id,
            });
        });
    } catch (err) {
        if (err) throw err;
        res.status(500).json('error');
    }
});

// Existing routes...

// Initiate a video call
router.post('/initiateVideoCall', async (req, res) => {
    try {
        const { recipient } = req.body;
        const callRequestId = uuidv4(); // Use UUID to generate a unique call request ID

        // Emit socket event to initiate the video call
        io.to(recipient).emit('incomingVideoCall', {
            sender: req.user.userId, // Assuming you have middleware to get user data from token
            recipient,
            callRequestId,
        });

        res.json({ message: 'Video call initiated successfully' });
    } catch (error) {
        console.error('Error initiating video call:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Answer a video call
router.post('/answerVideoCall', async (req, res) => {
    try {
        const { recipient, callRequestId, answer } = req.body;

        // Emit socket event to answer the video call
        io.to(recipient).emit('videoCallAnswered', {
            sender: req.user.userId, // Assuming you have middleware to get user data from token
            recipient,
            callRequestId,
            answer,
        });

        res.json({ message: 'Video call answered successfully' });
    } catch (error) {
        console.error('Error answering video call:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// ... (any other user routes you may have)

module.exports = router;
