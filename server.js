const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful...'));

// Start server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App (${process.env.NODE_ENV}) running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('💥 💥 💥 Unhandled Rejection... Shutting down...');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
