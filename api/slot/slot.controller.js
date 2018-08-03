'use strict';
const slotService = require('./slot.service');

const getSlots = async (req, res, next) => {
  const slots = await slotService.getSlots();
  return res.status(200).json(slots);
};

const createSlot = async (req, res, next) => {
  const newSlot = await slotService.createSlot(req.body);
  return res.status(201).json(newSlot);
};

const createSlotAndAddToDay = async (req, res, next) => {
  // construct slot with parameters
  const streamerId = req.params.user._id;
  const dayId = req.body.dayId;
  delete req.body.dayId;
  const slot = req.body;
  slot.streamer = streamerId;
  const result = await slotService.createSlotAndAddToDay({
    slot,
    dayId,
  });
  return res.status(201).json(result);
};

const deleteSlotAndRemoveFromDay = async (req, res, next) => {
  const slotDayId = req.query.dayId;
  const slotToRemoveId = req.query.slotId;
  const connectedStreamer = req.params.user;

  const result = await slotService.deleteSlotAndRemoveFromDay({
    slotDayId,
    slotToRemoveId,
    connectedStreamer,
  });
  if ((result || {}).error) {
    return res.send(result.error.httpCode).json(result.error.message);
  }
  return res.send(204);
};

module.exports = {
  getSlots,
  createSlot,
  createSlotAndAddToDay,
  deleteSlotAndRemoveFromDay,
};
