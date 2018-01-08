'use strict';
const mysql = require('mysql');
const db = require('db/index');

const getTest = (req, res, next) => {
  const connection = mysql.createConnection(db.config);
  connection.connect();
  connection.query('SELECT * FROM Test', (error, results, fields) => {
    console.log(results);
    return res.status(200).json(results);
  });
  connection.end();
};

module.exports = {
  getTest
};
