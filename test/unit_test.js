// @ts-check
// This turns on type checking in VS Code

// BEFORE TESTING, return the burgerzDB to its initial state by running 'setupDB.sh'

// run this test in the project root with:
//  $ mocha <path from root to file>/<test file name>.js
// OR
//  $ npm test - file MUST be named 'test.js' in the test folder

// these are needed only if testing with node
var mocha = require('mocha');
var chai = require('chai');
var assert = chai.assert;

describe("Connection tests", function() {
  const connection = require("../config/connection.js")
  afterEach(function(){
    // runs after each test in this block
    setTimeout(function() {}, 1000);
  });
  it('Connection exists', function() {
    assert.exists(connection, 'Connection object is null or undefined');
  });
  it('Connection has ID', function() {
    assert.isAbove(connection.threadId, 0, 'Connection Id is not > 0');
  });
});

describe("ORM tests", function() {
  const orm = require("../config/orm.js");
  it('Read devoured correctly', function(done) {
    const result = orm.selectAll(function(res) {
      assert.strictEqual(res[0].devoured, 1, 'Devoured read incorrectly');
      done();
    });
    
  });
  it('Read name correctly', function(done) {
    const result = orm.selectAll(function(res) {
      assert.strictEqual(res[1].burger_name, "Bacon Brie Mushroom Burger", 'Name read incorrectly');
      done();
    });
    
  });
  it('Inserted burger correctly', function(done) {
    const result = orm.insertOne('Plain Burger', false, function(res) {
      assert.isTrue(res.protocol41, "Insert did not succeed");
      done();
    });
  });
  it('Updated burger correctly', function(done) {
    const result = orm.updateOne('2', function(res) {
      assert.equal(res.changedRows, 1, "Update did not succeed");
      done();
    });
  });
})

describe('Burger Model tests', function() {
  const burger = require('../models/burger.js')
  it('Retrieves an array', function(done) {
    const result = burger.all(function(res) {
      assert.isArray(res, '.all does not retrieve an array');
      done();
    });
  });
  it('Array comprises objects', function(done) {
    const result = burger.all(function(res) {
      console.log('BM Array object test');
      for (var i = 0; i < res.length; i++) {
        assert.isObject(res[i], 'Result is not an object');
        assert.property(res[i], 'burger_name', 'does not have burger_name');
        assert.property(res[i], 'devoured', 'does not have devoured');
      }
      done();
    });
  });
  it('Creates a burger', function(done) {
   const result = burger.create('Really Big Plain Burger', function(res){
      assert.isTrue(res.protocol41, "Burger creation failed");
      done();
    });
  });
});
