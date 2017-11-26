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

app.use(bodyParser.json());
app.use(urlEncodedParser);

app.get('/', function(req, res) {
    res.send('/views/index.html');
});

app.post('/add-sms', function(req, res) {
    console.log(req);
    res.send(JSON.stringify(req.body));
});

app.use('/assets', express.static('assets'));
app.use('/', express.static('assets'));

io.on('connection', function(socket) {
	console.log('Connection Established');
	// socket.emit('update_notifs');

	// socket.on('disconnect', function() {
		// console.log('Connection Removed')
	// });
});

http.listen(port, function() {
    console.log ('Server running at port ' + port);
});
