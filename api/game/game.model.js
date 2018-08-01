const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
  label: String,
  base64Img: String
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
