const express = require("express");

const router = express.Router();

const orm = require("../config/orm.js");

router.get("/", (request, response) => {
  orm.all("burgers", function(rows) {
    response.render("index", { burgers: rows });
  });
});

module.exports = router;
