var db = require('../db_config.js');
var CronJob = require('cron').CronJob;
var tibia = require('tibia-node-crawler');

// var MongoClient = require('mongodb').MongoClient;
// var assert = require('assert');
// var ObjectId = require('mongodb').ObjectID;
// var url = 'mongodb://root:mongouser@ds021895.mlab.com:21895/tbamonitor';

// var characters = [];
// var updateChars = function(db, callback, characterObj){
// 				db.collection('characters').save(function(error, characterObj) {
// 			if(error) {
// 				callback({error: 'Não foi possivel salvar o character'});
// 			} else {
// 				callback(character);
// 			}
// 		});
// 	};

// var findCharacters = function(db, callback) {
	
//    var cursor =db.collection('characters').find();
//    cursor.each(function(err, doc) {
//       assert.equal(err, null);
//       if (doc != null) {
//       	 characters.push(doc);	
//       	 var name = doc.name;
//       	tibia.character(name, function(data){
// 		var characterObj = data.character;
	
//  		updateChars(db, function(){

//  		},characterObj);
// 	});

//       } else {
//          callback();
//       }
//    });
// };


// new CronJob('* * * * * *', function() {

// 	var characterObj;
// 	tibia.character('Olivera Rullezz', function(data){
// 		characterObj = data.character;
//  		characterObj.lastBackup = new Date();
//  		oficialController.save(characterObj, function(resp){});
//   		console.log('Saved backup of '+ characterObj.name+' at: ' + (new Date()));
// 	});	


// }, null, true, 'America/Los_Angeles');

exports.list = function(callback){

	db.Character.find({}, function(error, characters) {

		if(error) {

			callback({error: 'Não foi possivel retornar os usuarios'});
		} else {

			callback(characters);
		}
	});
};


exports.character = function(id, callback) {

	db.Character.findById(id, function(error, character) {

		if(error) {

			callback({error: 'Não foi possivel retornar o usuario'});
		} else {

			callback(character);
		}
	});
};


exports.save = function(character, callback){

	new db.Character(character).save(function(error, character) {

		if(error) {

			callback({error: 'Não foi possivel salvar o usuario'});
		} else {

			callback(character);
		}
	});
};

exports.updateByName = function(charEdit, callback) {
	db.Character.findOne({ 'name': charEdit.name }, function (err, character) {
		
		if(character){
		if(charEdit.level)
			character.level = charEdit.level;
		if(charEdit.residence)
			character.residence = charEdit.residence;

			character.save(function(error, character) {
  				if (err) return callback({error: 'Não foi possivel salvar o character'});
  				callback(character);
		});
		}
	});
};



		

exports.update = function(charEdit, callback) {

	db.Character.findById(charEdit._id, function(error, character) {
		
		if(charEdit.name)
		character.name = charEdit.name;
		if(charEdit.vocation)
		character.vocation = charEdit.vocation;
		if(charEdit.level)
		character.level = charEdit.level;
		if(charEdit.stamina)
		character.stamina = charEdit.stamina;
		if(charEdit.staminaUpdate)
		character.staminaUpdate = charEdit.staminaUpdate;
		if(charEdit.balance)
		character.balance = charEdit.balance;
		if(charEdit.owner)
		character.owner = charEdit.owner;


		character.save(function(error, character) {

			if(error) {
				callback({error: 'Não foi possivel salvar o character'});
			} else {
				callback(character);
			}
		});
	});
};

// exports.update = function(id, characterParam, callback) {

// 	db.Character.findById(id, function(error, character) {

// 		if(characterParam.name) {

// 			character.name = characterParam.name;
// 		}

// 		if(characterParam.level) {

// 			character.level = characterParam.level;
// 		}

// 		if(characterParam.stamina) {

// 			character.stamina = characterParam.stamina;
// 		}

// 		if(characterParam.vocation) {

// 			character.vocation = characterParam.vocation;
// 		}
// 		if(characterParam.balance) {

// 			character.vocation = characterParam.balance;
// 		}
// 		if(characterParam.owner) {

// 			character.vocation = characterParam.owner;
// 		}

// 		character.save(function(error, character) {

// 			if(error) {

// 				callback({error: 'Não foi possivel salvar o usuario'});
// 			} else {

// 				callback(character);
// 			}
// 		});
// 	});
// };


exports.delete = function(id, callback) {

	db.Character.findById(id, function(error, character) {

		if(error) {
			console.log(error);
			callback({error: 'Não foi possivel retornar o usuario'});
		} else {

			character.remove(function(error) {

				if(!error) {

					callback({response: 'Usuário excluido com sucesso'});
				}
			});
		}
	});
	
};



