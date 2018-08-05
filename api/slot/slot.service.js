'use strict';
const Slot = require('api/slot/slot.model');
const Day = require('api/day/day.model');
const _findIndex = require('lodash/findIndex');

const getSlots = async () => {
  return await Slot.find().populate('streamer', 'pseudo color game').exec();
};

const createSlot = async (slot) => {
  const newSlot = new Slot(slot);
  return await newSlot.save();
};

const createSlotAndAddToDay = async ({ slot, dayId }) => {
  const newSlot = await createSlot(slot);
  // search day by id
  const day = await Day.findById(dayId).exec();
  // add slot to the day
  day.slots.push(newSlot._id);
  return await day.save();
};

const deleteSlotAndRemoveFromDay = async ({ slotDayId, slotToRemoveId, connectedStreamer }) => {
  // Get the slot to remove
  const storedSlot = await Slot.findById(slotToRemoveId).exec();
  if (!storedSlot) {
    return {
      error: {
        message: 'Le slot que vous voulez supprimer n\'a pas été trouvé',
        httpCode: 404
      }
    };
  }
  // TODO : verif droit
  // get the day of the slot
  const storedDay = await Day.findById(slotDayId).populate('slots', '_id').exec();
  if (!storedDay) {
    return {
      error: {
        message: 'Le jour contenant le slot à supprimer n\'a pas été trouvé',
        httpCode: 404
      }
    };
  }
  // remove the slot from the day
  const slotIndexToRemove = _findIndex(storedDay.slots.toObject(), { id: slotToRemoveId });
  storedDay.slots.splice(slotIndexToRemove, 1);
  await storedDay.save();
  // remove the slot document
  await storedSlot.remove();
};

module.exports = {
  getSlots,
  createSlot,
  createSlotAndAddToDay,
  deleteSlotAndRemoveFromDay,
};
