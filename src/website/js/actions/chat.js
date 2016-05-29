import { getSocket } from '../sockets';

const socket = getSocket();

export const send = message => {
  socket.emit('message', {type: 'chat', message});
  return {type: 'VOID'}
}

