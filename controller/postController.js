var db = require('../db_config.js');

exports.list = function(callback){

	db.Post.find({}, function(error, posts) {

		if(error) {

			callback({error: 'Não foi possivel retornar os posts'});
		} else {

			callback(posts);
		}
	});
};

exports.post = function(id, callback) {

	db.Post.findById(id, function(error, post) {

		if(error) {

			callback({error: 'Não foi possivel retornar o post'});
		} else {

			callback(post);
		}
	});
};


exports.postsByPlace = function(idPlace, callback) {

	db.Post.find({ 'place': idPlace }, function (err, posts) {
		
		if(!err){
			
  				callback(posts);
		}else{
			callback({error: 'Não foi possivel retornar os posts'});
		}
	});
};


exports.obsByPlace = function(idPlace, callback) {

	db.Post.find({ 'place': idPlace }, function (err, posts) {
		
		if(!err){

//
  				callback(posts);
		}else{
			callback({error: 'Não foi possivel retornar os posts'});
		}
	}).sort({'created_at': -1}).limit(2);
};


exports.save = function(post, callback){

	post.created_at = new Date();
	
	new db.Post(post).save(function(error, post) {

		if(error) {

			callback({error: 'Não foi possivel salvar o post'});
		} else {

			callback(post);
		}
	});
};


exports.update = function(postEdit, callback) {

	db.Post.findById(postEdit._id, function(error, post) {
		
		if(postEdit.created_at)
		post.created_at = postEdit.created_at;
		if(postEdit.lotacao)
		post.lotacao = postEdit.lotacao;
		if(postEdit.precos)
		post.precos = postEdit.precos;
		if(postEdit.atendimento)
		post.atendimento = postEdit.atendimento;
		if(postEdit.obs)
		post.obs = postEdit.obs;
		if(postEdit.user)
		post.user = postEdit.user;
		if(postEdit.place)
		post.place = postEdit.place;

		post.save(function(error, post) {

			if(error) {
				callback({error: 'Não foi possivel salvar o post'});
			} else {
				callback(post);
			}
		});
	});
};


exports.delete = function(id, callback) {

	db.Post.findById(id, function(error, post) {

		if(error) {

			callback({error: 'Não foi possivel retornar o post'});
		} else {

			post.remove(function(error) {

				if(!error) {

					callback({response: 'Post excluido com sucesso'});
				}
			});
		}
	});
	
};