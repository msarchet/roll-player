let socket = null;
export let getSocket = () => {
  if(socket) {
    return socket;
  }
  socket = io();
  return socket;
}
