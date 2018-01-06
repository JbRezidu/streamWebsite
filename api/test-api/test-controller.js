'use strict';

const db = require('db/index');

const getTest = (req, res, next) => {
  db.connect();
  db.query('SELECT * FROM Test', (error, results, fields) => {
    /*console.log(error);*/
    console.log(results);
    /*console.log(fields);*/
    return res.status(200).json({test: 'ok'});
  });
  db.end();
};

module.exports = {
  getTest
};
