const mysql = require("mysql2");

require("dotenv").config();

const is_heroku = process.env.IS_HEROKU || false;

const dbConfigHeroku = {
  host: "us-cdbr-east-03.cleardb.com",
  user: "bec80d8e3186f3",
  password: "66bb8dd2",
  database: "heroku_57f1eadd63b46f9",
  multipleStatements: false,
  namedPlaceholders: true,
};

const dbConfigLocal = {
  host: "localhost",
  user: "root",
  password: process.env.DB_PASS,
  database: "restaurant_review",
  multipleStatements: false,
  namedPlaceholders: true,
};

if (is_heroku) {
  var database = mysql.createPool(dbConfigHeroku);
} else {
  var database = mysql.createPool(dbConfigLocal);
}

module.exports = database;
