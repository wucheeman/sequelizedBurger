// @ts-check
// This turns on type checking in VS Code

var orm = require("./../config/orm.js");


const burger = {
  all: function(cb) {
    // returns all burgers in the database as an array of burger objects
    // TODO (future) convert to forEach()
    orm.selectAll(function(res) {
      const burgerArray = [];
      for (var i = 0; i < res.length; i++) {
        let daBurger = {};
        daBurger.id = res[i].id;
        daBurger.burger_name = res[i].burger_name,
        daBurger.devoured = res[i].devoured;
        burgerArray.push(daBurger);
      }
      cb(burgerArray);
    });
  },
  create: function(newBurger, cb) {
    // inserts new burger into DB with state = not devoured and returns true
    orm.insertOne(newBurger, false, function(res) {
      cb(res);
    });
  },
  update: function(burgerID, cb) {
    // updates status of burger to devoured and returns true
    orm.updateOne(burgerID, function(res) {
      cb(res);
    });
  }
};

module.exports = burger;