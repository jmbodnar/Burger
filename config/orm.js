const burgersDB = require("../config/connection.js");

const orm = {
  all(table, cb) {
    query = "SELECT * FROM ??";
    burgersDB.query(query, [table], (error, rows) => {
      if (error) throw error;
      else cb(rows);
    });
  }
};

module.exports = orm;
