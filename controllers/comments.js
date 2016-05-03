var express = require('express');
var router = express.Router();

var Comments = require('../models/comments');

var db = require('../config/db');

router.post('/add', function (req, res) {
	var user_id = req.body.user_id;
	var text = req.body.text;

	Comments.add(function (err, docs) {
		res.end("insert success "+JSON.stringify(docs)+" ");
		console.log(docs);
	},
	{ 
		"user_id" : user_id,
		"text": text
	});
});

router.get('/getAll', function (req, res) {
	Comments.getAll(function (err, docs) {
		res.render('comments',{comments:docs});
		console.log("Get All Comments: "+JSON.stringify(docs)+" ");
	});
});

router.get('/getAllByUser/:user_id', function (req, res) {
	var user_id =req.params.user_id;

	Comments.getAllByUser(function (err, docs) {
		res.render('comments', {comments:docs});
		console.log("Get All Comments by User ID: "+JSON.stringify(docs)+"");
	},
	user_id
	);
});

module.exports = router;