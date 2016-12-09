var app = require('./app_config.js');

var userController = require('./controller/userController.js');

var mailer = require('./controller/mailer.js');

var db = require('./db_config.js');


var CronJob = require('cron').CronJob;
var validator = require('validator');
var tibia = require('tibia-node-crawler');

var fs = require('fs'),
    request = require('request'),
    cheerio = require('cheerio');
    

//
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://root:admin@ds119728.mlab.com:19728/androidws';
//





/*new CronJob('* * * *', function() {

	MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
  	findAndUpdateCharacters(db, function() {
    db.close();
  	});
	});

	MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
  	findAndUpdateBlackList(db, function() {
    db.close();
  	});
	});
	
		


	


}, null, true, 'America/Los_Angeles');*/




app.post('/welcome', function (req, res) {

	var user = req.body;
	mailer.welcomeMail(user);
	res.send("email sent!");
});

app.post('/forgotpasswordmail', function (req, res) {

	var user = req.body;
	mailer.passwordForgotMail(user);
	res.send("email sent!");
});




// app.get("/images/:image", function(req,res) {

//     db.Imagem.findOne({ "nome": 'img_0001' },function(err,imagem) {
//        res.set("Content-Type", "image/jpg");
//        res.send( imagem.file );
//     });
// });


// app.post("/images", function(req,res) {
   
// 	var img = req.body;
// 	imageController.save(img, function(resp){
// 		res.json(resp);
// 	});
// });

// var tibia = require('tibia-node-crawler');
 
// tibia.character('Olivera Rullezz', function(data){
//   console.log(data.character);
//   console.log(data.character.level);
//   console.log(data.achievements);
//   console.log(data.deaths);
//   //etc 
//   console.log(data);
// });


app.get('/', function(req, res) {
    res.sendfile('index.html', {root: __dirname })
});




app.get('/users', function (req, res) {
	//res.status(500).end();
	
	userController.list(function(resp){
		res.json(resp);
	});



	//res.json(itens);
});



app.get('/users/:username', function (req, res) {

	var username = req.param('username');
	userController.userByName(username, function(resp){
		res.json(resp);

	});


	//res.status(500).end();
	// res.json(itens);
});



app.get('/users/:id', function (req, res) {

	var id = req.param('id');
	userController.user(id, function(resp){
		res.json(resp);

	});


	//res.status(500).end();
	// res.json(itens);
});


app.post('/login', function (req, res) {

	var username = req.param('username');
	userController.userByName(username, function(resp){
		res.json(resp);

	});



	//res.end("post")
	//itens.push(item);
	//res.end();
});


app.post('/users', function (req, res) {

	var user = req.body;
	userController.save(user, function(resp){
		res.json(resp);
	});


	//res.end("post")
	//itens.push(item);
	//res.end();
});



app.put('/users', function (req, res) {
	
	//var id = req.param('_id');
	var userEdit = req.body;
	userController.update(userEdit, function(resp){
		res.json(resp);

	});

});



app.delete('/users/:id', function (req, res) {

	var id = req.param('_id');
	
		userController.delete(id, function(resp){
			res.json(resp);

		});


	//res.status(500).end();
	// res.json(itens);
});








