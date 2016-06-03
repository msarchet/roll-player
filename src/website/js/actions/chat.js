import { getSocket } from '../sockets';

const socket = getSocket();

export const send = message => {
  return {type: 'VOID'}
}

