const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const professorRoutes = require('./routes/search');
const messageRoutes = require('./routes/message');
const searchRoutes = require('./routes/search');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes); 
app.use('/api/user', userRoutes); 
app.use('/api/professors', professorRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/search', searchRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('DB connection error:', err));

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'https://christuniverse.vercel.app', 
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join_room', (userId) => {
    socket.join(userId);
    console.log(`${userId} joined room`);
  });

  socket.on('send_message', (data) => {
    console.log('Message received:', data);
    io.to(data.receiverEmail).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
