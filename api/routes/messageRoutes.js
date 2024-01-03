const express = require('express');
const Message = require('../models/Message');
const { getUserDataFromRequest } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/messages/:userId', async (req, res) => {
    const { userId } = req.params;
    const userData = await getUserDataFromRequest(req);
    const ourUserId = userData.userId;
    const messages = await Message.find({
        sender: { $in: [userId, ourUserId] },
        recipient: { $in: [userId, ourUserId] },
    }).sort({ createdAt: 1 });
    res.json(messages);
});

// ... (any other message routes you may have)

module.exports = router;

