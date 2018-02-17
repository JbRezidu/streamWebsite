'use strict';
const mongoose = require('mongoose');
const dbSettings = require('db/index2');
const Week = require('api/week/week.model');

const getWeeks = (req, res, next) => {
  Week
    .find()
    .populate({
      path: "days",
      select: "-__v -_id",
      populate: {
        path: "slots",
        select: "-__v -_id",
        populate: {
          path: "streamer",
          select: "-_id -__v -password"
        }
      }
    })
    .exec((err, days) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.status(200).json(days);
    });
};

const getWeekByDate = (req, res, next) => {
  const expectedDate = new Date(req.params.date);
  Week
    .findOne()
    .where('startDate').lte(expectedDate)
    .where('endDate').gte(expectedDate)
    .select('-__v -_id')
    .populate({
      path: "days",
      select: "-__v",
      populate: {
        path: "slots",
        select: "-__v -_id",
        populate: {
          path: "streamer",
          select: "-_id -__v -token -password"
        }
      }
    })
    .exec((err, week) => {
      res.status(200).json(week);
    });
};

const createWeek = (req, res, next) => {
  const newWeek = new Week(req.body);
  newWeek.save((err, _newWeek) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.status(200).json(_newWeek);
  });
};

module.exports = {
  getWeeks,
  createWeek,
  getWeekByDate,
};
