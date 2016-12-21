var db = require('../db_config.js');

exports.list = function(callback){

	db.Chat.find({}, function(error, chats) {

		if(error) {

			callback({error: 'Não foi possivel retornar os chats'});
		} else {

			callback(chats);
		}
	});
};


exports.chatBySender = function(userSend, callback) {

	db.Chat.findOne({ 'userSend': userSend }, function (err, chat) {
		
		if(!err){
			
  				callback(chat);
		}else{
			callback({error: 'Não foi possivel retornar o chat'});
		}
	}).sort({'created_at': -1});
};


exports.chat = function(id, callback) {

	db.Chat.findById(id, function(error, chat) {

		if(error) {

			callback({error: 'Não foi possivel retornar o chat'});
		} else {

			callback(chat);
		}
	});
};


exports.save = function(chat, callback){

	chat.created_at = new Date();
	
	new db.Chat(chat).save(function(error, chat) {

		if(error) {

			callback({error: 'Não foi possivel salvar o chat'});
		} else {

			callback(chat);
		}
	});
};


exports.update = function(chatEdit, callback) {

	db.Chat.findById(chatEdit._id, function(error, chat) {
		
		if(chatEdit.created_at)
		chat.created_at = chatEdit.created_at;
		if(chatEdit.lotacao)
		chat.lotacao = chatEdit.lotacao;
		if(chatEdit.precos)
		chat.precos = chatEdit.precos;
		if(chatEdit.atendimento)
		chat.atendimento = chatEdit.atendimento;
		if(chatEdit.obs)
		chat.obs = chatEdit.obs;
		if(chatEdit.user)
		chat.user = chatEdit.user;
		if(chatEdit.place)
		chat.place = chatEdit.place;

		chat.save(function(error, chat) {

			if(error) {
				callback({error: 'Não foi possivel salvar o chat'});
			} else {
				callback(chat);
			}
		});
	});
};


exports.delete = function(id, callback) {

	db.Chat.findById(id, function(error, chat) {

		if(error) {

			callback({error: 'Não foi possivel retornar o chat'});
		} else {

			chat.remove(function(error) {

				if(!error) {

					callback({response: 'Chat excluido com sucesso'});
				}
			});
		}
	});
	
};