var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var api = require('./routes/api');
var PORT = process.env.PORT || 4242;
var app = express();

var db_url = "mongodb://User2:passw0rd@ds251804.mlab.com:51804/teamapp";
mongoose.connect(db_url, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//app.use('/api', api);
app.use('/', express.static(__dirname + '/www'));

app.get('/', function(req,res){
    res.render('index', {messages: ''});
});

app.listen(PORT, function(){
    console.log('Server up and running');
});