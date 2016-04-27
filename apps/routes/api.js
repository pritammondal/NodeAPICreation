var User = require('../model/user');
var Story = require('../model/user');
var config = require('../../config');
var nodemailer = require('nodemailer');
//var smsClient = require('twilio')('AC2eae5611478e2a918771b8922e78afca','8c8480b4bf283c08831096fba63dad72');

var secretKey = config.secretKey;

var jsonwebtoken = require('jsonwebtoken');

function createMyToken (user) {
	var token = jsonwebtoken.sign({
		_id: user._id,
		name: user.name,
		username: user.username
	}, secretKey, {
		expiresInMinute: 1440 
	});

	return token;
}

module.exports = function (app, express) {
	var api = express.Router();

	api.post('/signup', function (req, res) {
		var user = new User({
			name: req.body.name,
			username: req.body.username,
			password: req.body.password
		});
		user.save(function (err) {
			if (err) {
				res.send(err);
				return;
			}

			res.send({ 'message': 'User has been created', 'status': 'Done' });
		});
	});

	api.get('/user', function (req, res) {
		User.find({}, function (err, users) {
			if (err) {
				re.send(err);
				return;
			}
			res.json(users);
		});
	});

	api.post('/login', function (req, res) {
		User.findOne({
			username: req.body.username
		}).select('password').exec(function (err, user) {
			if (err) {
				throw err;
			}
			if (!user) {
				res.send({'message': 'User doesnot exist!'});
			} else if (user) {
				var validPassword = user.comparePassword(req.body.password);
				if (!validPassword) {
					res.send({ 'message': 'Invalid Password' });
				} else {
					//res.json({ 'success': true, 'message' : 'Successfully Login' });
					// useing token 
					var token = createMyToken(user);

					res.json({
						success: true,
						message: "Successfully login",
						token: token
					});
				}
			}
		});
	});

	// Using middle wire 
	api.use(function (req, res, next) {
		console.log('Going through middlewire');

		var token = req.body.token || req.param('token') || req.headers['x-access-token'];

		if (token) {

			jsonwebtoken.verify(token, secretKey, function (err, decoded) {
				if (err) {
					res.status(403).send({ success: false, message: 'Failed to Authenticate the user.'});
				} else {
					req.decoded = decoded;
					next();
				}

			});

		} else {

			res.status(403).send({ success: false, message: 'Token Not Provided.'});
		}
	});

	// Get check with valid token
	// api.get('/', function (req, res) {
	// 	res.json("Got through it");
	// });

	// Providing legitimate token
	api.route('/').post(function (req, res) {
		var story = new Story ({
			creator: req.decoded.id,
			content: req.body.content
		});

		story.save(function (err) {
			if (err) {
				res.send(err);
				return;
			}
			res.json({ message : 'User Story board created! '});
		});
	})

	// testing get created stories for the user loggedin 
	/*.get(function (err) {
		Story.find ({ creator: req.decoded.id }, function (err, stories) {

			if (err) {
				res.send(err);
				return;
			}
			res.json(stories)

		});
		
	});*/




	api.post('/sendmail', function (req, res, next) {
		var mailer = require("nodemailer");

		// Use Smtp Protocol to send Email
		var smtpTransport = mailer.createTransport({
		    service: "Gmail",
		    auth: {
		        username: 'pritammondal619@gmail.com',
				password: '619619619'
		    }
		});

		var mail = {
		    from: "Pritam Mondal<pritammondal.wb@gmail.com>",
		    to: "pritammondal.wb@gmail.com",
		    subject: "Send Email Using Node.js",
		    text: "Name : "+req.body.name+"Email : "+req.body.email+'Description : '+req.body.desc,
		    html: "<b>Name : "+req.body.name+"</b><br><b>Name : "+req.body.email+"</b><br><b>Name : "+req.body.desc+"</b>"
		}

		smtpTransport.sendMail(mail, function(error, res){
		    if(error){
		        console.log(error);
		    }else{
		        console.log("Message sent: " + res.message);
		    }
		    
		    smtpTransport.close();
		});

	});

	/*api.get('/sendSMS', function (req, res) {
		smsClient.sendMessage({
			to: '+919836006702',
			from: '+17637102265',
			body: 'Hi test from node'
		}, function (err, data) {
			if (err) {
				console.log(err);
			} else {
				console.log(data);
			}
		});
	});*/

	

	return api;
};