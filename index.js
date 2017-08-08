'use strict';

const app = require('express')();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const path = require('path');

const PORT = process.env.PORT || 3000;
server.listen(PORT);


app.get('/index.html', function(req, res){
	res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/control.html', function(req, res){
	res.sendFile(path.join(__dirname, '/control.html'));
});

app.get('/js/d3.min.js', function(req, res) {
	res.sendFile(path.join(__dirname, '/js/d3.min.js'));
});

var screensIO = io.of('/screens-namespace');
var controlIO = io.of('/control-namespace');

var focus;

var processedData = [];
var loaded = 0;
var toLoad = 0;
var loading = false;

screensIO.on('connection', function(socket) {
	if (processedData.length == 0 && !loading) {
		loading = true;
		http.get('http://apps.harvardartmuseums.org/archives-month-2017/data.JSON', (res) => {
			if (res.statusCode == 200) {
				var rawData = '';
				res.setEncoding('utf8');
				res.on('data', (d) => {rawData += d;});
				res.on('end', () => {
					socket.emit('data', rawData, focus);
				});
			} 
		});
	} else if (!loading) {
		socket.emit('data', processedData, focus);
	}

	socket.on('updateData', function (d, total) {
		toLoad = total;
		processedData.push(d);
		loaded++;
		if (loaded == toLoad) {
			loading = false;
			focus = 0;
			controlIO.emit('data', processedData, focus);
			screensIO.emit('data', processedData, focus);
		}
	});
});

controlIO.on('connection', function(socket) {
	if (processedData.length && !loading) {
		socket.emit('data', processedData, focus);
	}

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

