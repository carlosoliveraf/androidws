var db = require('../db_config.js');
var tibia = require('tibia-node-crawler');


exports.list = function(callback){
	db.BlackList.find({}, function(error, characters) {

		if(error) {

			callback({error: 'Não foi possivel retornar os usuarios'});
		} else {

			callback(characters);
		}
	});
};


exports.blackList = function(name, callback) {
	tibia.character(name, function(data){
 		callback(data);
});

};

exports.save = function(character, callback){

	new db.BlackList(character).save(function(error, character) {

		if(error) {

			callback({error: 'Não foi possivel salvar o usuario'});
		} else {

			callback(character);
		}
	});
};

exports.updateByName = function(charEdit, callback) {
	db.BlackList.findOne({ 'name': charEdit.name }, function (err, character) {
		
		if(character){
		if(charEdit.level)
			character.level = charEdit.level;
		if(charEdit.lastBackup)
			character.lastBackup = charEdit.lastBackup;
		

			character.save(function(error, character) {
  				if (err) return callback({error: 'Não foi possivel salvar o character'});
  				callback(character);
		});
		}

	});
};

exports.delete = function(id, callback) {

	db.BlackList.findById(id, function(error, character) {

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


