'use strict';

const mongoose = require('mongoose');
const dbSettings = require('db/index2');
const Streamer = require('api/streamer/streamer.model');
const randToken = require('rand-token');

const login = (req, res, next) => {
  console.log(req.body.password);
  Streamer
    .findOne()
    .where('password').equals(req.body.password)
    .select('-password')
    .exec((err, streamer) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (!streamer) {
        return res.status(404).json("Aucun streamer avec ce mot de passe");
      }
      // generate token
      const token = randToken.generate(64);
      // save token in the database
      streamer.token = token;
      streamer.save((err, streamer) => {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json({
          pseudo: streamer.pseudo,
          token: streamer.token,
          color: streamer.color,
        });
      });
    });
}

const logout = (req, res, next) => {

}

module.exports = {
  login,
  logout,
};
