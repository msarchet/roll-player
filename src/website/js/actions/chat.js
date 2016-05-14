import { getSocket } from '../sockets';

const socket = getSocket();

export const send = message => {
  console.log('emitting message');
  socket.emit('message', {type: 'chat', message});
  return {type: 'DERP'}
}

