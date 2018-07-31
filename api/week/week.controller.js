'use strict';

const weekService = require('api/week/week.service');

const getWeeks = async (req, res, next) => {
  const result = weekService.getWeeks();
  return res.status(200).json(result);
};

const getWeekByDate = async (req, res, next) => {
  const result = await weekService.getWeekByDate(req.params.date);
  if (!result) {
    return res.status(404).json('No week found');
  }
  return res.status(200).json(result);
};

const createWeek = async (req, res, next) => {
  const result = weekService.createWeek(req.body);
  return res.status(200).json(result);
};

const instanciateCurrentWeek = async (req, res, next) => {
  const result = await weekService.instanciateCurrentWeek();
  return res.status(201).json(result);
};

module.exports = {
  getWeeks,
  createWeek,
  getWeekByDate,
  instanciateCurrentWeek,
};
