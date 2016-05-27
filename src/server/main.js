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
  socket.on('message', message => {
    socketHandler.parse(message)
      .then(result => {
        socket.emit('message', result);
      })
      .catch((err) => {
        console.error(err);
      });;
  });
});

server.listen(process.env.PORT || 9000, () => {
  console.log('Roll Player - Server Running on Port 9000');
});
