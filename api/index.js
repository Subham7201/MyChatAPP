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
