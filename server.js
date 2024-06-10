/* eslint-disable no-console */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http');
// eslint-disable-next-line import/no-extraneous-dependencies
const socketio = require('socket.io');

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
const server = http.createServer(app);
const io = socketio(server);

app.set('io', io);

server.listen(port, () => {
  console.log(`App is running on ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! 💥 Shutting Down...');
  //this will give time to finish running process and then shutdown the server
  server.close(() => {
    process.exit(1);
  });
});

io.on('connection', socket => {
  console.log('New WebSocket Connection');

  socket.on('join', userId => {
    socket.join(userId);
    console.log(`User ${userId} joined`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

module.exports = { io };
