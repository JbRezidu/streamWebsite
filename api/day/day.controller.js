'use strict';
const mongoose = require('mongoose');
const dbSettings = require('db/index2');
const Day = require('api/day/day.model');

const getDays = (req, res, next) => {
  Day
    .find()
    .populate({
      path: "slots",
      select: "-__v -_id",
      populate: {path: "streamer", select: "-password -__v -_id"}
    })
    .exec((err, days) => {
      if (err) {
        res.status(500).json(err);
      }
      res.status(200).json(days);
    });
};

const createDay = (req, res, next) => {
  const newDay = new Day(req.body);
  newDay.save((err, _newDay) => {
    if (err) {
      res.status(500).json(err);
    }
    res.status(200).json(_newDay);
  });
};

module.exports = {
  getDays,
  createDay,
};
