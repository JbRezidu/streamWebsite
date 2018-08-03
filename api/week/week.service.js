'use strict';
const moment = require('moment');
moment.locale('fr');

const dayService = require('api/day/day.service');
const Week = require('api/week/week.model');

const getWeeks = async () => {
  return await Week.find()
    .populate({
      path: 'days',
      select: '-__v -_id',
      populate: {
        path: 'slots',
        select: '-__v -_id',
        populate: {
          path: 'streamer',
          select: '-_id -__v -password',
        },
      },
    })
    .exec();
};

const getWeekByDate = async (date) => {
  const expectedDate = new Date(date);
  return await Week.findOne()
    .where('startDate')
    .lte(expectedDate)
    .where('endDate')
    .gte(expectedDate)
    .select('-__v -_id')
    .populate({
      path: 'days',
      select: '-__v',
      populate: {
        path: 'slots',
        select: '-__v',
        populate: [
          {
            path: 'streamer',
            select: '-_id -__v -token -password',
          },
          {
            path: 'game',
            select: '-_id -__v'
          }
        ],
      },
    })
    .exec();
};

const createWeek = async (week) => {
  const newWeek = new Week(week);
  return await newWeek.save();
};

const instanciateCurrentWeek = async () => {
  const newWeek = new Week({
    startDate: moment()
      .startOf('week')
      .toDate(),
    endDate: moment()
      .endOf('week')
      .toDate(),
    days: [],
  });
  // create days
  for (const day of moment.weekdays()) {
    const newDay = await dayService.createDay({
      date: moment()
        .day(day)
        .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        .toDate(),
      slots: [],
    });
    newWeek.days.push(newDay);
  }
  return await newWeek.save();
};

module.exports = {
  getWeeks,
  getWeekByDate,
  createWeek,
  instanciateCurrentWeek,
};
