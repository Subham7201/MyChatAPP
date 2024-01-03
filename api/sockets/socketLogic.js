// sockets/socketManager.js
const Message = require('../models/Message')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

dotenv.config();
const jwtSecret = process.env.JWT_SECRET

function configureSocket(socket, io) {
    function notifyAboutOnlinePeople() {
        const onlineUsers = [];

        for (const [socketId, socket] of io.of('/').sockets) {
            if (socket.userId && socket.username) {
                onlineUsers.push({ userId: socket.userId, username: socket.username });
            }
        }

        io.emit('online', { online: onlineUsers });
    }



    socket.on('message', async (messageData) => {
        const { recipient, text, file } = messageData;
        let filename = null;
        if (file) {
            console.log('size', file.data.length);
            const parts = file.name.split('.');
            const ext = parts[parts.length - 1];
            filename = Date.now() + '.' + ext;
            const path = __dirname + '/uploads/' + filename;
            const bufferData = Buffer.from(file.data.split(',')[1], 'base64');
            fs.writeFile(path, bufferData, () => {
                console.log('file saved:' + path);
            });
        }

        if (recipient && (text || file)) {
            const messageDoc = await Message.create({
                sender: socket.userId,
                recipient,
                text,
                file: file ? filename : null,
            });

            console.log('created message');
            io.to(recipient).emit('newMessage', {
                text,
                sender: socket.userId,
                recipient,
                file: file ? filename : null,
                _id: messageDoc._id,
            });
        }
    });

    socket.on('initiateVideoCall', ({ recipient }) => {
        const callRequestId = uuidv4(); // Use UUID to generate a unique call request ID
        io.to(recipient).emit('incomingVideoCall', {
            sender: socket.userId,
            recipient,
            callRequestId,
        });
    });

    socket.on('answerVideoCall', ({ recipient, callRequestId, answer }) => {
        io.to(recipient).emit('videoCallAnswered', {
            sender: socket.userId,
            recipient,
            callRequestId,
            answer,
        });
    });

    // read username and id from the cookie for this connection
    const cookies = socket.handshake.headers.cookie;
    if (cookies) {
        const tokenCookieString = cookies.split(';').find(str => str.startsWith('token='));
        if (tokenCookieString) {
            const token = tokenCookieString.split('=')[1];
            if (token) {
                jwt.verify(token, jwtSecret, {}, (err, userData) => {
                    if (err) throw err;
                    const { userId, username } = userData;
                    socket.userId = userId;
                    socket.username = username;
                    notifyAboutOnlinePeople();
                });
            }
        }
    }

    socket.on('disconnect', () => {
        notifyAboutOnlinePeople();
    });
}

module.exports = { configureSocket };
