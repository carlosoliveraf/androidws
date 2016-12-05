var db = require('../db_config.js');
var tibia = require('tibia-node-crawler');


exports.list = function(callback){
	
};


exports.oficial = function(name, callback) {
	tibia.character(name, function(data){
 		callback(data);
});

};

exports.save = function(character, callback){

	new db.Oficial(character).save(function(error, character) {

		if(error) {

			callback({error: 'Não foi possivel salvar o usuario'});
		} else {

			callback(character);
		}
	});
};




