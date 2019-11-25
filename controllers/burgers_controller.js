const express = require("express");
const router = express.Router();
const orm = require("../config/orm.js");

router.get("/", (request, response) => {
  orm.getAll("burgers", function(rows) {
    response.render("index", { burgers: rows });
  });
});

router.get("/api/all", (request, response) => {
  orm.all("burgers", function(rows) {
    response.json(rows);
  });
});

router.post("/api/addone", (request, response) => {
  const burger_name = request.body.new_burger;
  orm.addOne("burgers", burger_name);
  response.redirect("/");
});

router.put("/api/eatone", (request, response) => {
  const updateID = request.body.id;
  orm.eatOne(updateID);
  response.sendStatus(204);
});

router.put("/api/barfone", (request, response) => {
  const updateID = request.body.id;
  orm.barfOne(updateID);
  response.sendStatus(204);
});

module.exports = router;
