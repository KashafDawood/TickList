const mongoose = require('mongoose');
const dotenv = require('dotenv');

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
app.listen(port, () => {
  console.log(`App is running on ${port}...`);
});
