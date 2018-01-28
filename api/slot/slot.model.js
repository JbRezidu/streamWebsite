const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slotSchema = mongoose.Schema({
  startHour: Number,
  duration: {type: Number, default: 1},
  description: String,
  title: String,
  streamer: {type: Schema.Types.ObjectId, ref: 'Streamer'}
});

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;
