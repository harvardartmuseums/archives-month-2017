'use strict';

const app = require('express')();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const path = require('path');

const PORT = process.env.PORT || 3000;
server.listen(PORT);

var data;

http.get('http://apps.harvardartmuseums.org/archives-month-2017/data.json', (res) => {
	if (res.statusCode == 200) {
		var rawData = '';
		res.setEncoding('utf8');
		res.on('data', (d) => {rawData += d;});
		res.on('end', () => {
			data = rawData;
		});
	} 
});


app.get('/index.html', function(req, res){
	res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/control.html', function(req, res){
	res.sendFile(path.join(__dirname, '/control.html'));
});

app.get('/data/:file', function(req, res) {
	res.sendFile('apps.harvardartmuseums.org/archives-month-2017/' + req.params.file);
});

app.get('/js/d3.min.js', function(req, res) {
	res.sendFile(path.join(__dirname, '/js/d3.min.js'));
});

var screensIO = io.of('/screens-namespace');
var controlIO = io.of('/control-namespace');

var focus;

var processedData = [];

screensIO.on('connection', function(socket) {
	socket.emit('data', (processedData.length? processedData : data), focus);

	socket.on('updateData', function (d) {
		processedData.push(d);
		focus = 0;
	});
});

controlIO.on('connection', function(socket) {
	socket.emit('data', (processedData.length? processedData : data), focus);

	socket.on('zoom', function(i) {
		focus = i;
		screensIO.emit('zoom', i);
		controlIO.emit('zoom', i);
	});

	socket.on('unzoom', function(i) {
		focus = i;
		screensIO.emit('unzoom');
		controlIO.emit('unzoom');
	});
});

