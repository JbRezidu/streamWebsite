'use strict';
const gameService = require('api/game/game.service');

const getGames = async (req, res, next) => {
  const result = await gameService.getGames();
  return res.status(200).json(result);
};

module.exports = {
  getGames,
};
