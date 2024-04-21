/* eslint-disable no-console */
const mongoose = require('mongoose');
const dotenv = require('dotenv');

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
const server = app.listen(port, () => {
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
