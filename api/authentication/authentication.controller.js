'use strict';

const mongoose = require('mongoose');
const dbSettings = require('db/index2');
const Streamer = require('api/streamer/streamer.model');
const randToken = require('rand-token');

const checkAuthentication = (req, res, next) => {
  const streamer = req.headers.streamer;
  const token = req.headers.token;
  Streamer.findOne()
    .where('pseudo').equals(streamer)
    .where('token').equals(token)
    .exec((err, streamer) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (!streamer) {
        // Le streamer n'a pas été trouvé avec ce token ou avec ce pseudo
        return res.status(400).json({code: 404, message: 'Streamer non trouvé'});
      }
      req.params.streamer = streamer;
      next();
    });
};

const login = (req, res, next) => {
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
  Streamer
    .findOne()
    .where('pseudo').equals(req.headers.streamer)
    .exec((err, streamer) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (!streamer) {
        return res.status(400).json({code: 404, message: 'Streamer non trouvé'});
      }
      streamer.token = undefined;
      streamer.save(err => {
        console.log('test');
        if (err) {
          return res.status(500).json(err);
        }
        return res.send(204);
      });
    });
}

module.exports = {
  login,
  logout,
  checkAuthentication,
};
