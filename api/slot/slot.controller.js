'use strict';
const mongoose = require('mongoose');
const dbSettings = require('db/index2');
const Slot = require('api/slot/slot.model');
const Day = require('api/day/day.model');
const _findIndex = require('lodash/findIndex');

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

const createSlotAndAddToDay = (req, res, next) => {
  req.body.streamer = req.params.streamer._id;
  const dayId = req.body.dayId;
  delete (req.body.dayId);
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

const deleteSlotAndRemoveFromDay = (req, res, next) => {
  const connectedStreamer = req.params.streamer;
  const slotDayId = req.query.dayId;
  const slotToRemoveId = req.query.slotId;
  Slot.findById(slotToRemoveId, (err, slot) => {
    if (err) {
      res.status(500).json(err);
    }
    if (!slot) {
      res.status(404).json('Le slot que vous voulez supprimer n\'a pas été trouvé');
    }
    // TODO : verif droit
    // suppression du slot dans le tableau de slot des days
    Day
      .findById(slotDayId)
      .populate('slots', '_id')
      .exec((err, day) => {
        if (err) {
          res.status(500).json(err);
        }
        if (!slot) {
          res.status(404).json('Le jour contenant le slot à supprimer n\'a pas été trouvé');
        }
        const slotIndexToRemove = _findIndex(day.slots.toObject(), {id: slotToRemoveId});
        day.slots.splice(slotIndexToRemove, 1);
        day.save((err, savedDay) => {
          // après avoir supprimé le slot du day on supprime le slot directement
          if (err) {
            res.status(500).json(err);
          }
          slot.remove((err, removedSlot) => {
            if (err) {
              res.status(500).json(err);
            }
            res.send(204);
          });
        });
      });
  });
};

module.exports = {
  getSlots,
  createSlot,
  createSlotAndAddToDay,
  deleteSlotAndRemoveFromDay,
};
