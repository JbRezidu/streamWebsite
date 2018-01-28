const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weekSchema = mongoose.Schema({
  startDate: Date,
  endDate: Date,
  days: [{type: Schema.Types.ObjectId, ref: 'Day'}]
});

const Week = mongoose.model('Week', weekSchema);

module.exports = Week;
