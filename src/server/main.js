'use strict';

const express = require('express');
const http = require('http');

let app = express();
let server = http.Server(app);
let io = require('socket.io')(server);
let socketHandler = require('./socket');
let path = require('path');
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname , '../../build/website/html/index.html'));
});

app.use('/static', express.static('./build/website'));

io.on('connection', (socket) => {
  let greeting = {message: 'hello!'};
  console.log('got a new connection');
  socket.emit('message', {type: 'message', message: greeting});
  socket.on('message', message => {
    socketHandler.parse(message, (err, result) => {
      console.log('emitting', result);
      socket.emit('message', result);
    });
  });
});
server.listen(9000, () => {
  console.log('Roll Player - Server Running on Port 9000');
});
