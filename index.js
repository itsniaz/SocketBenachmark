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

app.use(express.json());
app.post('/triggerEvent', (req, res) => {
    io.emit('benchmark', req.body);
    res.json(req.body);
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

app.get('/triggerEvent', (req, res) => {   
    io.emit('benchmark', req.body);
    res.send('<h1>Event triggered</h1>');
});

client.on('benchmark', (data) => {    
    console.log('event received');
    console.log(data);
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});