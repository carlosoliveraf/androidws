var db = require('../db_config.js');


exports.list = function(callback){
	db.Post.find({}, function(error, posts) {

		if(error) {

			callback({error: 'Não foi possivel retornar os usuarios'});
		} else {

			callback(posts);
		}
	});
};


exports.post = function(id, callback) {

	db.Post.findById(id, function(error, post) {

		if(error) {

			callback({error: 'Não foi possivel retornar o usuario'});
		} else {

			callback(post);
		}
	});
};


exports.save = function(sPost, callback){

	new db.Post(sPost).save(function(error, post) {

		if(error) {

			callback({error: 'Não foi possivel salvar o usuario'});
		} else {

			callback(post);
		}
	});
};


exports.delete = function(id, callback) {

	db.Post.findById(id, function(error, post) {

		if(error) {
			console.log(error);
			callback({error: 'Não foi possivel retornar o usuario'});
		} else {

			post.remove(function(error) {

				if(!error) {

					callback({response: 'Usuário excluido com sucesso'});
				}
			});
		}
	});
	
};


