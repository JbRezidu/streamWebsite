'use strict';
const mongoose = require('mongoose');
const dbSettings = require('db/index2');
const Slot = require('api/slot/slot.model');
const Day = require('api/day/day.model');

const getSlots = (req, res, next) => {
  Slot
    .find()
    .populate("streamer", "pseudo color")
    .exec((err, slots) => {
      if (err) {
        res.status(500).json(err);
      }
      res.status(200).json(slots);
    });
};

const createSlot = (req, res, next) => {
  const newSlot = new Slot(req.body);
  newSlot.save((err, _newSlot) => {
    if (err) {
      res.status(500).json(err);
    }
    res.status(200).json(_newSlot);
  });
};

const createSlotAndAddToDay = (req, res,next) => {
  const dayId = req.body.dayId;
  delete(req.body.dayId);
  const newSlot = new Slot(req.body);
  newSlot.save((err, _newSlot) => {
    if (err) {
      res.status(500).json(err);
    }
    // search day by id
    Day.findById(dayId, (err, day) => {
      day.slots.push(_newSlot._id);
      day.save((err, _day) => {
        res.status(200).json(_day);
      });
    });
  });
};

module.exports = {
  getSlots,
  createSlot,
  createSlotAndAddToDay,
};
