'use strict';

const express = require('express');
const http = require('http');

let app = express();
let server = http.Server(app);
let io = require('socket.io')(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/build/src/website/jade/index.html');
});

app.use('/static', express.static('./build/src/website'));

io.on('connection', (socket) => {
  console.log('got a connection');
  socket.emit('message', {type: 'message', data: 'hello!'});
});
server.listen(9000, () => {
  console.log('Roll Player - Server Running on Port 9000');
});
