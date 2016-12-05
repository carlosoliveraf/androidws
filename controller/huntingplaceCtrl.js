var db = require('../db_config.js');


exports.list = function(callback){

	db.HuntingPlace.find({}, function(error, places) {

		if(error) {

			callback({error: 'Não foi possivel retornar os usuarios'});
		} else {

			callback(places);
		}
	});
};


exports.huntingplace = function(id, callback) {

	db.HuntingPlace.findById(id, function(error, place) {

		if(error) {

			callback({error: 'Não foi possivel retornar o usuario'});
		} else {

			callback(place);
		}
	});
};


exports.save = function(place, callback){

	new db.HuntingPlace(place).save(function(error, place) {

		if(error) {

			callback({error: 'Não foi possivel salvar o usuario'});
		} else {

			callback(place);
		}
	});
};


exports.update = function(placeEdit, callback) {

	db.HuntingPlace.findById(placeEdit._id, function(error, place) {
		
		if(placeEdit.name)
		place.name = placeEdit.name;
		if(placeEdit.city)
		place.city = placeEdit.city;
		if(placeEdit.range)
		place.range = placeEdit.range;
		if(placeEdit.detail)
		place.detail = placeEdit.detail;
		if(placeEdit.owner)
		place.owner = placeEdit.owner;
		if(placeEdit.link)
		place.link = placeEdit.link;


		place.save(function(error, place) {

			if(error) {
				callback({error: 'Não foi possivel salvar o place'});
			} else {
				callback(place);
			}
		});
	});
};


exports.delete = function(id, callback) {

	db.HuntingPlace.findById(id, function(error, place) {

		if(error) {
			console.log(error);
			callback({error: 'Não foi possivel retornar o usuario'});
		} else {

			place.remove(function(error) {

				if(!error) {

					callback({response: 'Usuário excluido com sucesso'});
				}
			});
		}
	});
	
};



