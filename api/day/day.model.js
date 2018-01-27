const mongoose = require('mongoose');
const Slot = require('api/slot/slot.model');

const daySchema = mongoose.Schema({
  date: Date,
  slots: [Slot]
});

const Day = mongoose.model('Day', daySchema);

module.exports = Day;
