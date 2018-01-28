'use strict';
const mongoose = require('mongoose');
const dbSettings = require('db/index2');
const Streamer = require('api/streamer/streamer.model');

const getStreamers = (req, res, next) => {
  Streamer.find((err, streamers) => {
    if (err) {
      res.status(500).json(err);
    }
    res.status(200).json(streamers);
  });
};

const createStreamer = (req, res, next) => {
  const newStreamer = new Streamer(req.body);
  newStreamer.save((err, _newStreamer) => {
    if (err) {
      res.status(500).json(err);
    }
    res.status(200).json(_newStreamer);
  });
};

module.exports = {
  getStreamers,
  createStreamer,
};
