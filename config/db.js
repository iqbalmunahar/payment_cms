var mysql = require('mysql');
var async = require('async');

var PRODUCTION_DB = 'payment_cms_atas';
var TEST_DB = 'payment_cms';

// Load configuration
var config = require('./config');

// Set the environment
var env = process.env.NODE_ENV || config.environment;

var state = {
	pool: null,
	mode: null
};

exports.connect = function (mode, callback) {
	state.pool = mysql.createPool({
		host: 'localhost',
		user: 'root',
		password: '',
		database: mode === 'production' ? PRODUCTION_DB : TEST_DB
	});

	state.mode = mode;
	callback();
};

exports.get = function () {
	return state.pool;
};

exports.fixtures = function(data, done) {
  var pool = state.pool
  if (!pool) return done(new Error('Missing database connection.'))

  var names = Object.keys(data.tables)
  async.each(names, function(name, cb) {
    async.each(data.tables[name], function(row, cb) {
      var keys = Object.keys(row)
        , values = keys.map(function(key) { return "'" + row[key] + "'" })

      pool.query('INSERT INTO ' + name + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ')', cb)
    }, cb)
  }, done)
}

exports.drop = function(tables, done) {
  var pool = state.pool
  if (!pool) return done(new Error('Missing database connection.'))

  async.each(tables, function(name, cb) {
    pool.query('DELETE * FROM ' + name, cb)
  }, done)
}