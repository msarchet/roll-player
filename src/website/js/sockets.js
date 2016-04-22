let socket = null;
export const getSocket = () => {
  if(socket) {
    return socket;
  }

  return socket = io();
}
