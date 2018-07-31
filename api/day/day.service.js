'use strict';

const Day = require('api/day/day.model');

const createDay = async (day) => {
  const newDay = new Day(day);
  return await newDay.save();
};

module.exports = {
  createDay,
};
