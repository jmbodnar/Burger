const mysql = require("mysql2");

const burgersDB = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "docker",
  database: "burgers_db"
});

burgersDB.connect(error => {
  if (error) console.error(err.stack);
  else console.log(`Connection thread id: ${burgersDB.threadId}`);
});

module.exports = burgersDB;
