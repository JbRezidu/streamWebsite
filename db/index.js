'use strict';

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'hmsw.fr',
  user: 'streamerzone',
  password: 'hmfcooGqQ3',
  database: 'leBDG_BDD'
});

module.exports = connection;
