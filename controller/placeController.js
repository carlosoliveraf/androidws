var db = require('../db_config.js');

exports.list = function(callback){

	db.Place.find({}, function(error, places) {

		if(error) {

			callback({error: 'Não foi possivel retornar os locais'});
		} else {

			callback(places);
		}
	});
};

exports.place = function(id, callback) {

	db.Place.findById(id, function(error, place) {

		if(error) {

			callback({error: 'Não foi possivel retornar o local'});
		} else {

			callback(place);
		}
	});
};

exports.placeByName = function(name, callback) {

	db.Place.findOne({ 'name': name }, function (err, place) {
		
		if(!err){
			
  				callback(place);
		}else{
			callback({error: 'Não foi possivel retornar o usuario'});
		}
	});
};



exports.save = function(place, callback){

	new db.Place(place).save(function(error, place) {

		if(error) {

			callback({error: 'Não foi possivel salvar o usuario'});
		} else {

			callback(place);
		}
	});
};


exports.update = function(placeEdit, callback) {

	db.Place.findById(placeEdit._id, function(error, place) {
		if(placeEdit.name)
		place.name = placeEdit.name;
		if(placeEdit.email)
		place.funcionamento = placeEdit.funcionamento;
		if(placeEdit.url)
		place.url = placeEdit.url;
		if(placeEdit.telefone)
		place.telefone = placeEdit.telefone;
		if(placeEdit.endereco)
		place.endereco = placeEdit.endereco;
		if(placeEdit.lat)
		place.lat = placeEdit.lat;
		if(placeEdit.long)
		place.long = placeEdit.long;

		place.save(function(error, place) {

			if(error) {
				callback({error: 'Não foi possivel salvar o usuario'});
			} else {
				callback(place);
			}
		});
	});
};

exports.delete = function(id, callback) {

	db.Place.findById(id, function(error, place) {

		if(error) {

			callback({error: 'Não foi possivel retornar o local'});
		} else {

			place.remove(function(error) {

				if(!error) {

					callback({response: 'Local excluido com sucesso'});
				}
			});
		}
	});
	
};