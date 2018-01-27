const mongoose = require('mongoose');
const Day = require('api/day/day.model');

const weekSchema = mongoose.Schema({
  startDate: Date,
  endDate: Date,
  days: [Day]
});

const Week = mongoose.model('Week', weekSchema);

module.exports = Week;
