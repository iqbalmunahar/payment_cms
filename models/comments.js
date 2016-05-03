var db = require('../config/db');

exports.add = function (callback, post) {
	var values = [post.user_id, post.text, new Date().toISOString()];
	db.get().query('INSERT INTO comments (user_id, text, date) VALUEs (?,?,?)', values, function (err, result) {
		if(err)throw(err);
		callback(null, result.insertId);
	});
};

exports.getAll = function (callback) {
	db.get().query("SELECT * FROM comments", function (err, result) {
		if(err) throw(err);
		callback(null, result);
	});
};

exports.getAllByUser = function (callback, id) {
	db.get().query("SELECT * FROM comments WHERE user_id = ?", id, function (err, result) {
		if(err) throw(err);
		callback(null, result);
	});
};