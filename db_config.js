//var db_string = 'mongodb://127.0.0.1/appteste';
var db_string = 'mongodb://root:admin@ds119728.mlab.com:19728/androidws';



var mongoose = require('mongoose').connect(db_string);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro ao conectar banco'));

db.once('open', function(){
	var userSchema = mongoose.Schema({
		name: String,
		email: String,
		username: String,
		password: String,
		isAdmin: Boolean,
		created_at: Date
	});

	exports.User = mongoose.model('User', userSchema);

	var placeSchema = mongoose.Schema({
		name: String,
		email: String,
		funcionamento: String,
		url: String,
		telefone: Number,
		endereco: String,
		lat: Number,
		long: Number
	});

	exports.Place = mongoose.model('Place', placeSchema);

	var postSchema = mongoose.Schema({
		created_at: Date,
		produto: Number,
		lotacao: Number,
		precos: Number,
		atendimento: Number,
		obs: String,
		user: String,
		place: String

	});

	exports.Post = mongoose.model('Post', postSchema);


});


