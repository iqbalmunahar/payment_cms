// Modules dependencies
var express 		= require('express');
var bodyParser 	= require('body-parser');
var http				= require('http');
var morgan 			= require('morgan')

// Custom module //
// Load mysql db configuration module
var db = require('./config/db');

// Load configuration
var config = require('./config/config');

// Declare needed variable //
// Express instance
var app = express();

// Set the port for app listener
var port = process.env.PORT || 3000;

// Set the environment
var env = process.env.NODE_ENV || config.environment;

// Middlewares setting function //
// Set the running port 
app.set('port', process.env.PORT || 3000);

// Set the template using EJS
app.set('views',__dirname + '/views');
app.engine('ejs', require('ejs').__express);
app.set('view engine','ejs');

// Use the static middleware to get access to the public directory like img,js,css,etc
app.use(express.static(__dirname + '/public'));

// Use the bodyparser middleware module to accept json & form post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use the logging function
app.use(morgan('combined'));


// Setting the environmet
// Condition for environment
// if ('development' == env) {
//
// }else{
//
// }

// Use the custom controllers/routes middleware to route the URL and do logic
app.use(require('./controllers'));

// Execute the app
// Connect the mysql and running the server when success, otherwise exit 
db.connect(env, function (err) {
	if(err){
		console.log("Unable to connect");
		process.exit();
	}else{
		http.createServer(app).listen(app.get('port'), function(){
			console.log("Express server listening on port " + app.get('port'));
		});
	}
});