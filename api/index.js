// const cookieParser = require('cookie-parser');
// const Message = require('./models/Message');
// const User = require('./models/User');
// const socketIo = require('socket.io');
// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const express = require('express');
// const bcrypt = require('bcryptjs');
// const dotenv = require('dotenv');
// const OpenAI = require('openai');
// const cors = require('cors');  
// const http = require('http');
// const path = require('path');
// const fs = require('fs');

// dotenv.config();
// mongoose.connect(process.env.MONGO_URL).then(() => {
//   console.log("MongoDB connected");
// }).catch((error) => {
//   console.error("MongoDB connection error: ", error);
// });

// const jwtSecret = process.env.JWT_SECRET;
// const bcryptSalt = bcrypt.genSaltSync(10);

// const app = express();
// app.use('/uploads', express.static(__dirname + '/uploads'));
// app.use(express.json());
// app.use(cookieParser());

// // Add CORS middleware
// app.use(cors({
//   origin: 'http://localhost:5173', // Update with your React app's URL
//   credentials: true,
// }));




// /*

// // ... openAI key 

// const openai = new OpenAI({
//   apiKey: process.env.OpenAI_KEY, // Replace with your OpenAI API key
// });

// const speechFile = path.resolve("./speech.mp3");

// async function main() {
//   const mp3 = await openai.audio.speech.create({
//     model: "tts-1",
//     voice: "alloy",
//     input: "Today is a wonderful day to build something people love!",
//   });
//   console.log(speechFile);
//   // const buffer = Buffer.from(await mp3.arrayBuffer());
//   // await fs.promises.writeFile(speechFile, buffer);
// }
// main();

// app.post('/openai/chat', async (req, res) => {
//   try {
//     const { userId, message } = req.body;

//     // Perform any user authentication or authorization checks here if needed

//     // Send a request to OpenAI GPT API
//     const openaiResponse = await openai.chat.completions.create({
//       messages: [{ role: 'user', content: message }],
//       model: 'gpt-3.5-turbo',
//     });

//     const chatGptResponse = openaiResponse.data.choices[0].text;

//     // You can save the chatGptResponse to your database or send it directly to the user
//     res.json({ userId, chatGptResponse });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


// */

// // ... (your existing middleware and routes)

// // Move getUserDataFromRequest outside of io.on('connection', ...)
// async function getUserDataFromRequest(req) {
//   return new Promise((resolve, reject) => {
//     const token = req.cookies?.token;
//     if (token) {
//       jwt.verify(token, jwtSecret, {}, (err, userData) => {
//         if (err) reject(err);
//         resolve(userData);
//       });
//     } else {
//       reject('no token');
//     }
//   });
// }




// app.get('/messages/:userId', async (req, res) => {
//   const { userId } = req.params;
//   const userData = await getUserDataFromRequest(req);
//   const ourUserId = userData.userId;
//   const messages = await Message.find({
//     sender: { $in: [userId, ourUserId] },
//     recipient: { $in: [userId, ourUserId] },
//   }).sort({ createdAt: 1 });
//   res.json(messages);
// });

// app.get('/people', async (req, res) => {
//   const users = await User.find({}, { '_id': 1, username: 1 });
//   res.json(users);
// });

// app.get('/profile', (req, res) => {
//   const token = req.cookies?.token;
//   if (token) {
//     jwt.verify(token, jwtSecret, {}, (err, userData) => {
//       if (err) throw err;
//       res.json(userData);
//     });
//   } else {
//     res.status(401).json('no token');
//   }
// });

// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;
//   const foundUser = await User.findOne({ username });
//   if (foundUser) {
//     const passOk = bcrypt.compareSync(password, foundUser.password);
//     if (passOk) {
//       jwt.sign({ userId: foundUser._id, username }, jwtSecret, {}, (err, token) => {
//         res.cookie('token', token, { sameSite: 'none', secure: true }).json({
//           id: foundUser._id,
//         });
//       });
//     }
//   }
// });

// app.post('/logout', (req, res) => {
//   res.cookie('token', '', { sameSite: 'none', secure: true }).json('ok');
// });

// app.post('/register', async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
//     const createdUser = await User.create({
//       username: username,
//       password: hashedPassword,
//     });
//     jwt.sign({ userId: createdUser._id, username }, jwtSecret, {}, (err, token) => {
//       if (err) throw err;
//       res.cookie('token', token, { sameSite: 'none', secure: true }).status(201).json({
//         id: createdUser._id,
//       });
//     });
//   } catch (err) {
//     if (err) throw err;
//     res.status(500).json('error');
//   }
// });

// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: 'http://localhost:5173',  // Update with your React app's URL
//     methods: ['GET', 'POST'],
//     credentials: true,
//   },
// });

// // ... (your existing socket.io logic)

// io.on('connection', (socket) => {
//   function notifyAboutOnlinePeople() {
//     const onlineUsers = [];

//     for (const [socketId, socket] of io.of('/').sockets) {
//       if (socket.userId && socket.username) {
//         onlineUsers.push({ userId: socket.userId, username: socket.username });
//       }
//     }

//     io.emit('online', { online: onlineUsers });
//   }



//   socket.on('message', async (messageData) => {
//     const { recipient, text, file } = messageData;
//     let filename = null;
//     if (file) {
//       console.log('size', file.data.length);
//       const parts = file.name.split('.');
//       const ext = parts[parts.length - 1];
//       filename = Date.now() + '.' + ext;
//       const path = __dirname + '/uploads/' + filename;
//       const bufferData = Buffer.from(file.data.split(',')[1], 'base64');
//       fs.writeFile(path, bufferData, () => {
//         console.log('file saved:' + path);
//       });
//     }

//     if (recipient && (text || file)) {
//       const messageDoc = await Message.create({
//         sender: socket.userId,
//         recipient,
//         text,
//         file: file ? filename : null,
//       });

//       console.log('created message');
//       io.to(recipient).emit('newMessage', {
//         text,
//         sender: socket.userId,
//         recipient,
//         file: file ? filename : null,
//         _id: messageDoc._id,
//       });
//     }
//   });

//   // read username and id from the cookie for this connection
//   const cookies = socket.handshake.headers.cookie;
//   if (cookies) {
//     const tokenCookieString = cookies.split(';').find(str => str.startsWith('token='));
//     if (tokenCookieString) {
//       const token = tokenCookieString.split('=')[1];
//       if (token) {
//         jwt.verify(token, jwtSecret, {}, (err, userData) => {
//           if (err) throw err;
//           const { userId, username } = userData;
//           socket.userId = userId;
//           socket.username = username;
//           notifyAboutOnlinePeople();
//         });
//       }
//     }
//   }

//   socket.on('disconnect', () => {
//     notifyAboutOnlinePeople();
//   });
// });

// const PORT = process.env.PORT || 4040;
// server.listen(PORT, () => {
//   console.log(`Server running on Port ${PORT}`);
// });







// app.js (or server.js)
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const { configureSocket } = require('./sockets/socketLogic');
const { openai } = require('./services/openaiService');
const messageRoutes = require('./routes/messageRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Connect to MongoDB
require('./config/database');

// Use routes
app.use(messageRoutes);
app.use(userRoutes);
// ... (other route usage)

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:5173',  // Update with your React app's URL
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Configure socket logic using the separated module
io.on('connection', (socket) => configureSocket(socket, io));

const PORT = process.env.PORT || 4040;
server.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
