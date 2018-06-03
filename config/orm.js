// @ts-check
// This turns on type checking in VS Code

var connection = require("./connection.js");


// TODO (future): convert direct SQL so that it uses "?" instead, per Boot Camp examples.
// Protects against SQL injection!

const orm = {
  selectAll: function(cb) {
    let queryString = "SELECT * FROM burgers";
    connection.query(queryString, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  insertOne: function(bName, dState, cb) {
    let queryString = `INSERT INTO burgers (burger_name, devoured) VALUES ("${bName}", ${dState});` ;
    
    connection.query(queryString, function(err, result) {
      //console.log('in insertOne, before error');
      if (err) throw err;
      //console.log('in insertOne, after error');
      //console.log(result);
      cb(result);
    })
  },
  updateOne: function(bID, cb) {
    // console.log('in orm.updateOne; bID = ' + bID);
    let queryString = `UPDATE burgers SET devoured=true WHERE id="${bID}";` ;
    connection.query(queryString, function(err, result) {
      if (err) throw err;
      // console.log('in UpdateOne, after error');
      // console.log(result);
      cb(result);
    });
  }
}

module.exports = orm;