var express = require('express');
var engine = require('consolidate');


var bodyParser = require('body-parser');

var app = module.exports = express();

//app.set('views', __dirname + '/views');
//app.engine('html', engine.mustache);
app.set('view engine', 'html');

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({
	extended: true
}));


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Request-Width, Content-Type, Accept, x-access-token');
  next();
});








