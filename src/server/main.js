'use strict';

const express = require('express');
const http = require('http');
const path = require('path');
const favicon = require('serve-favicon');

let app = express();

let server = http.Server(app);
let io = require('socket.io')(server);
let socketHandler = require('./socket');

app.set('view engine', 'pug');
app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use('/static', express.static('./build/website'));

app.get('/roll/:roll', (req, res) => {
  let result = socketHandler.parse({type: 'chat', message: {message: '/roll ' + req.params.roll}}).then(result => {  
    res.send('<html><head><title>&#x2694;You rolled ' + req.params.roll + ' and got ' + result.message.value  + '</title></head></html>'); 
  }).catch(err => {
    console.log(err);
    res.send('<html><head><title>You were eaten by a grue</title></head></html>'); 
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname , '../../build/website/html/index.html'));
});

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

  socket.on('get_character', message => {
    socket.emit('character_data', {
      name: 'Fredick Milnor',
      stats: [
        {'STR': 10 },
        {'DEX': 10 },
        {'CON': 10 },
        {'INT': 10 },
        {'WIS': 10 },
        {'CHA': 10 },
      ],
      skills: [
        {label: 'Talking',  modifier: 1, modified_by: 'stats.CHA'},
        {label: 'Eating',   modifier: 1, modified_by: 'stats.DEX'},
        {label: 'Drinking', modifier: 1, modified_by: 'stats.CON'},
        {label: 'Sleeping', modifier: 1, modified_by: 'stats.WIS'},
      ]
    });
  });
});

server.listen(process.env.PORT || 9000, () => {
  console.log('Roll Player - Server Running on Port 9000');
});
