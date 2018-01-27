const mongoose = require('mongoose');
const Streamer = require('../api/streamer/streamer.model');
const dbSettings = require('./index2');

mongoose.connect(`mongodb://${dbSettings.username}:${dbSettings.password}@${dbSettings.host}:${dbSettings.port}/${dbSettings.database}`);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()  => {
  const alkor = new Streamer({
    pseudo: 'Alkor',
    color: 'red',
    password: 'abcd'
  });
  alkor.save((err, alkor) => {
    if (err) {
      return console.error(err);
    }
    console.log("streamer correctement enregirstré");
    process.exit(1);
  });
});
