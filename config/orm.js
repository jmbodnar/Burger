const burgersDB = require("../config/connection.js");

const orm = {
  getAll(table, cb) {
    const query = "SELECT * FROM ??";
    burgersDB.query(query, [table], (error, rows) => {
      if (error) throw error;
      else cb(rows);
    });
  },

  addOne(table, value, cb) {
    const query = "INSERT INTO ?? (burger_name) VALUES (?)";
    burgersDB.query(query, [table, value], (error, resultInfo) => {
      if (error) throw error;
      else console.table(resultInfo.info);
    });
  },

  eatOne(id) {
    const query = "UPDATE burgers SET devoured = true WHERE id = ?";
    burgersDB.query(query, [id], (error, resultInfo) => {
      if (error) throw error;
      else console.table(resultInfo.info);
    });
  },

  barfOne(id) {
    const query = "UPDATE burgers SET devoured = false WHERE id = ?";
    burgersDB.query(query, [id], (error, resultInfo) => {
      if (error) throw error;
      else console.table(resultInfo.info);
    });
  },

  all(table, cb) {
    const query = "SELECT * FROM ??";
    burgersDB.query(query, [table], (error, rows, fields) => {
      if (error) {
        throw error;
      } else {
        cb(rows);
      }
    });
  }
};

module.exports = orm;
