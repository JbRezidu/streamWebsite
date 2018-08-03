const mongoose = require('mongoose');
const dbSettings = require('./index2');

mongoose.connect(
  `mongodb://${dbSettings.username}:${dbSettings.password}@${dbSettings.host}:${dbSettings.port}/${
    dbSettings.database
  }`,
  { useNewUrlParser: true }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
  try {
    process.exit(1);
  } catch (err) {
    console.log(err);
  }
});
