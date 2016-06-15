/**
 * Created by DK6 on 13.06.2016.
 */
var util = require('util');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var game = require('./game');
var vec = require('./vecmath').vec;
const PORT = process.env.PORT || 8000;

http.listen(PORT);

var ball;

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

function setEventHandlers() {
    io.on('connection', onSocketConnection);
}

function onClientDisconnect () {
    util.log("Player's disconnected: " + this.id);
}

function onSocketConnection (client) {
    util.log('New connection: ' + client.id);
    client.on('disconnect', onClientDisconnect);
    client.on('move', onBallPosition);
}

function onBallPosition() {
    ball.Move();
    this.emit('ballpos', {x: ball.Position.x, y: ball.Position.y, z: ball.Position.z});
    //util.log("X: " + ball.Position.x, "Y: " + ball.Position.y, "Z: " + ball.Position.z);
}

function init() {
    var battleDore = new vec(0, 0, 0);

    ball = new game.ball(
        new vec(0, 5, 4.05), new vec(0, -0.05, -0.09), .01, .2, 40,
        new vec(-2.3, 2.4, 4.05), new vec(4.6, 0, 8.1),
        new vec(-2.3, 2.8, -4.05), new vec(4.6, 7.5 - 2.8, 0),
        new vec(battleDore.x - 0.25, battleDore.y - 0.25, battleDore.z), new vec(0.05, 0.05, 0));
        
    setEventHandlers();
}

init();