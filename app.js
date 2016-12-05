var app = require('./app_config.js');

var userController = require('./controller/userController.js');
var characterController = require('./controller/characterCtrl.js');
var oficialController = require('./controller/oficialCtrl.js');
var huntingplaceController = require('./controller/huntingplaceCtrl.js');
var characController = require('./controller/characCtrl.js');
var blacklistController = require('./controller/blacklistCtrl.js');
var imageController = require('./controller/imageCtrl.js');
var postController = require('./controller/postCtrl.js');
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
var url = 'mongodb://root:mongouser@ds021895.mlab.com:21895/tbamonitor';
//



var findAndUpdateCharacters = function(db, callback) {
   var cursor =db.collection('characters').find( );
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
      	var char = doc;
		var characterObj;
		tibia.character(char.name, function(data){
		characterObj = data.character;
 		characterObj.lastBackup = new Date(); 	
 		//oficialController.save(characterObj, function(resp){});
   		//console.log('Saved backup of '+ characterObj.name+' at: ' + (new Date()));	
 		characterController.updateByName(characterObj, function(resp){});


	});	

         //console.dir(doc);
      } else {
         callback();
      }
   });
};

var findAndUpdateBlackList = function(db, callback) {
   var cursor =db.collection('blacklists').find( );
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
      	var char = doc;
		var characterObj;
		tibia.character(char.name, function(data){
		characterObj = data.character;
 		characterObj.lastBackup = new Date(); 	
 		//oficialController.save(characterObj, function(resp){});
   		//console.log('Saved backup of '+ characterObj.name+' at: ' + (new Date()));	
 		blacklistController.updateByName(characterObj, function(resp){});

 		
	});	

         //console.dir(doc);
      } else {
         callback();
      }
   });
};
//

new CronJob('* * * *', function() {

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
	
		


	


}, null, true, 'America/Los_Angeles');


app.get('/isonline', function(req, res) {

  request('https://secure.tibia.com/community/?subtopic=worlds&world=Veludera', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
                var resultado = [];

    $('.InnerTableContainer tr:not(:first-child)').each(function(i, element){
      

            var name = $(this).find('td').eq(0).text().trim(),
                    level = $(this).find('td').eq(1).text().trim(),
                    vocation = $(this).find('td').eq(2).text().trim();
                // Inserindo os dados num array
                resultado.push({
                    name: name,
                    level: level,
                    vocation: vocation
                });


    });
        res.json(resultado);
  }
});
})

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


app.get("/seeimage", function(req,res) {

    db.Image.findOne({}, {}, { sort: { 'date' : -1 } },function(err,image) {
       res.set("Content-Type", "image/jpg");
       res.send( image.file );
    });
});

app.get("/seeimage/:user", function(req,res) {
	var user = req.param('user');
    db.Image.findOne({'username': user}, {}, { sort: { 'date' : -1 } },function(err,image) {
    	if(image){
       res.set("Content-Type", "image/jpg");
       res.send( image.file );
   }else{
   		res.send(null);
   }
    });
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

// app.get('/', function (req, res) {
//     res.render('index');
// }); 


// app.get('*', function (req, res) {
//     res.render('index');
// });

// app.get('index/', function (req, res) {
	//res.status(500).end();
	
	//userController.list(function(resp){
		//res.json(resp);
		

	//});



	//res.json(itens);
// });

app.get('/itens/:id', function (req, res) {

	var id = validator.trim(validator.escape(req.param('id')));
	userController.user(id, function(resp){
		res.json(resp);

	});


	//res.status(500).end();
	// res.json(itens);
});


app.post('/itens', function (req, res) {

	var fullname = validator.trim(validator.escape(req.param('fullname')));
	var email = validator.trim(validator.escape(req.param('email')));
	var password = validator.trim(validator.escape(req.param('password')));
	
	userController.save(fullname, email, password, function(resp){
		res.json(resp);
	});


	//res.end("post")
	//itens.push(item);
	//res.end();
});


app.put('/itens', function (req, res) {
		
	var id = validator.trim(validator.escape(req.param('id')));
	var fullname = validator.trim(validator.escape(req.param('fullname')));
	var email = validator.trim(validator.escape(req.param('email')));
	var password = validator.trim(validator.escape(req.param('password')));
	
	userController.update(id, fullname, email, password, function(resp){
		res.json(resp);

	});

});

app.delete('/itens/:id', function (req, res) {

	var id = validator.trim(validator.escape(req.param('id')));
	
		userController.delete(id, function(resp){
			res.json(resp);

		});


	//res.status(500).end();
	// res.json(itens);
});


app.get('/characters', function (req, res) {
	//res.status(500).end();
	
	characterController.list(function(resp){
		res.json(resp);
	});



	//res.json(itens);
});

app.get('/posts', function (req, res) {
	//res.status(500).end();
	
	postController.list(function(resp){
		res.json(resp);
	});



	//res.json(itens);
});

app.post('/posts', function (req, res) {
	var post = req.body;
	postController.save(post, function(resp){
		res.json(resp);
	});


});

app.get('/blacklist', function (req, res) {
	//res.status(500).end();
	
	blacklistController.list(function(resp){
		res.json(resp);
	});


	//res.json(itens);
});



app.post('/blacklist', function (req, res) {

	var blacklistC = req.body;
	blacklistController.save(blacklistC, function(resp){
		res.json(resp);
	});


	//res.end("post")
	//itens.push(item);
	//res.end();
});

app.delete('/blacklist/:id', function (req, res) {

	var id = req.param('id');
		blacklistController.delete(id, function(resp){
			res.json(resp);

		});


	//res.status(500).end();
	// res.json(itens);
});


app.get('/oficial/:name', function (req, res) {

	var name = req.param('name');
	oficialController.oficial(name, function(resp){
		res.json(resp);

	});


	//res.status(500).end();
	// res.json(itens);
});

app.get('/characters/:id', function (req, res) {

	var id = req.param('id');
	characterController.character(id, function(resp){
		res.json(resp);

	});


	//res.status(500).end();
	// res.json(itens);
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

app.post('/users', function (req, res) {

	var user = req.body;
	userController.save(user, function(resp){
		res.json(resp);
	});


	//res.end("post")
	//itens.push(item);
	//res.end();
});


app.post('/characters', function (req, res) {

	
	var character = req.body;
	//console.log(req.body);
	characterController.save(character, function(resp){
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



app.delete('/characters/:id', function (req, res) {

	var id = req.param('id');
		characterController.delete(id, function(resp){
			res.json(resp);

		});


	//res.status(500).end();
	// res.json(itens);
});

app.put('/characters', function (req, res) {
	
	//var id = req.param('_id');
	var charEdit = req.body;
	characterController.update(charEdit, function(resp){
		res.json(resp);

	});

});


app.get('/charac', function (req, res) {
	
	characController.list(function(resp){
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








