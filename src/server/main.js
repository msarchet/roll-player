'use strict';

const express = require('express');
const http = require('http');

let app = express();
let server = http.Server(app);
let io = require('socket.io')(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/build/website/html/index.html');
});

app.use('/static', express.static('./build/website'));

io.on('connection', (socket) => {
  let greeting = {message: 'hello!'};
  socket.emit('message', {type: 'message', message: greeting});
  socket.on('message', message => {
    socket.broadcast.emit('message', {type: 'message', message});
  });
});
server.listen(9000, () => {
  console.log('Roll Player - Server Running on Port 9000');
});
