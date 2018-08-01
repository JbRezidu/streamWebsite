'use strict';

const Game = require('api/game/game.model');

const getGames = async () => {
  return await Game.find().select('_id label base64Img').exec();
};

module.exports = {
  getGames,
};
