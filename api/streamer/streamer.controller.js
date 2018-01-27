'use strict';
const mongoose = require('mongoose');
const dbSettings = require('db/index2');
const Streamer = require('api/streamer/streamer.model');

const getStreamers = (req, res, next) => {
  mongoose.connect(`mongodb://${dbSettings.username}:${dbSettings.password}@${dbSettings.host}:${dbSettings.port}/${dbSettings.database}`);
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', ()  => {
    Streamer.find((err, streamers) => {
      if (err) {
        res.status(500).json(err);
      }
      res.status(200).json(streamers);
    });
  });
};

const createStreamer = (req, res, next) => {
  mongoose.connect(`mongodb://${dbSettings.username}:${dbSettings.password}@${dbSettings.host}:${dbSettings.port}/${dbSettings.database}`);
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', ()  => {
    const newStream = new Streamer(req.body);
    newStream.save((err, newStreamer) => {
      if (err) {
        res.status(500).json(err);
      }
      res.status(200).json(newStreamer);
    });
  });
};

module.exports = {
  getStreamers,
  createStreamer,
};
