const mongoose = require('mongoose');
const Streamer = require('../api/streamer/streamer.model');
const Game = require('../api/game/game.model');
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
    // const alkor = new Streamer({
    //   pseudo: 'Alkor',
    //   color: 'red',
    //   password: 'abcd',
    // });
    // await alkor.save();
    // console.log('streamer correctement enregirstré');
    process.exit(1);
  } catch (err) {
    console.log(err);
  }
});
