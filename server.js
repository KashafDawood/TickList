/* eslint-disable no-console */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http');

const socket = require('./socket');

process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  console.log('UNHANDLED EXCEPTION! 💥 Shutting Down...');
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

//DATABASE CONNECTION
mongoose.connect(DB).then(() => {
  console.log('DB connected successfully ✅');
});

const port = process.env.PORT;
// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = socket.init(server);

io.on('connection', clientSocket => {
  console.log('New WebSocket Connection');

  clientSocket.on('join', userId => {
    if (!userId) {
      console.error('No userId provided');
      return;
    }
    clientSocket.join(userId);
    console.log(`User ${userId} joined`);
  });

  clientSocket.on('sendMessage', (userId, message) => {
    if (!userId) {
      console.error('No userId provided');
      return;
    }
    if (!message) {
      console.error('No message provided');
      return;
    }
    io.to(userId).emit('receiveMessage', message);
  });

  clientSocket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
server.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! 💥 Shutting Down...');
  //this will give time to finish running process and then shutdown the server
  server.close(() => {
    process.exit(1);
  });
});

module.exports = server;
