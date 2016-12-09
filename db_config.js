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


});


