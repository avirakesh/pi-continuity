var express = require('express');
var port = 8088; // default = 8088
                 // change to 80 if you don't want to type ':8088' at the end.
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var bodyParser = require('body-parser');

var urlEncodedParser = bodyParser.urlencoded({
    extended: false
});

var MongoClient = require('mongodb').MongoClient;
var arrest = require('assert');
// Hard Coded for now
var databaseUrl = 'mongodb://localhost:27017/sms';

var db;

var smsModule = require('./modules/sms-module.js');

app.use(bodyParser.json());
app.use(urlEncodedParser);

MongoClient.connect(databaseUrl, function(err, database) {
    if (err) {
        return console.log(err);
    }

    db = database;

    http.listen(port, function() {
        console.log ('Server running at port ' + port);
    });
});

app.get('/', function(req, res) {
    res.send('/views/index.html');
});

app.post('/add-sms', function(req, res) {
    smsModule.addSms(req.body, res, db);
});

app.use('/assets', express.static('assets'));
app.use('/', express.static('assets'));

io.on('connection', function(socket) {
	console.log('Connection Established');
});
