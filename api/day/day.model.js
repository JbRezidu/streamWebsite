const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const daySchema = mongoose.Schema({
  date: Date,
  slots: [{type: Schema.Types.ObjectId, ref: 'Slot', default: []}],
});

const Day = mongoose.model('Day', daySchema);

module.exports = Day;
