const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


var socketIOClient = require('socket.io-client');
var client = socketIOClient.connect('http://localhost:3000');

app.get('/', (req, res) => {
  res.send('<h1>A Basic Node.JS Server</h1>');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

app.get('/triggerEvent', (req, res) => {   
    io.emit('benchmark', { message: 'Hello from Benchmark Server' });
    res.send('<h1>Event triggered</h1>');
});
client.on('benchmark', (socket) => {    
    console.log('benchmark event received : ' + socket.message);
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});