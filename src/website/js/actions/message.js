const newMessage = payload => {
  return {
    type: 'NEW_WEBSOCKET_MESSAGE',
    data: payload
  }
}
