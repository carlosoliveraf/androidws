var db = require('../db_config.js');

exports.list = function(callback){

	db.Charac.find({}, function(error, characs) {

		if(error) {

			callback({error: 'Não foi possivel retornar os usuarios'});
		} else {

			callback(characs);
		}
	});
};


exports.charac = function(id, callback) {

	db.Charac.findById(id, function(error, charac) {

		if(error) {

			callback({error: 'Não foi possivel retornar o usuario'});
		} else {

			callback(charac);
		}
	});
};


exports.save = function(name, level, vocation, stamina, equipments, owner, callback){

	new db.Charac({

		'name': name,
		'level': level,
		'vocation': vocation,
		'stamina': stamina,
		'equipments': equipments,
		'owner': owner
	}).save(function(error, charac) {

		if(error) {

			callback({error: 'Não foi possivel salvar o usuario'});
		} else {

			callback(charac);
		}
	});
};


exports.update = function(id, name, level, stamina, vocation, callback) {

	db.Charac.findById(id, function(error, charac) {

		if(name) {

			charac.name = name;
		}

		if(level) {

			charac.level = level;
		}

		if(stamina) {

			charac.stamina = stamina;
		}

		if(vocation) {

			charac.vocation = vocation;
		}

		charac.save(function(error, charac) {

			if(error) {

				callback({error: 'Não foi possivel salvar o usuario'});
			} else {

				callback(charac);
			}
		});
	});
};


exports.delete = function(id, callback) {

	db.Charac.findById(id, function(error, charac) {

		if(error) {
			console.log(error);
			callback({error: 'Não foi possivel retornar o usuario'});
		} else {

			charac.remove(function(error) {

				if(!error) {

					callback({response: 'Usuário excluido com sucesso'});
				}
			});
		}
	});
	
};



