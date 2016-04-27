var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');
var mongoose = require('mongoose');

mongoose.connect(config.database, function (err) {
	if (err) {
		console.log(err);
	} else {
		console.log('Connected to Database');
	}
});

var app = express();

app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

var api = require('./apps/routes/api')(app, express);
app.use('/devapi', api);

app.get('*', function function_name (req, res) {
	res.sendFile(__dirname + '/public/view/index.html');
});

app.listen(config.port, function function_name (err) {
	if (err) {
		console.log(err);
	} else {
		console.log('Listening on port 3000');
	}
});