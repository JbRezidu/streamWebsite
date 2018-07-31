'use strict';
const Day = require('api/day/day.model');
const dayService = require('api/day/day.service');

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

const createDay = async (req, res, next) => {
  const newDay = await dayService.createDay(req.body);
  res.status(200).json(newDay);
};

module.exports = {
  getDays,
  createDay,
};
