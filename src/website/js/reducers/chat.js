const chat = (state = [], action) => {
  switch(action.type) {
    case 'SEND_MESSAGE':
    case 'NEW_MESSAGE':
      return [
        ...state,
        action.message
      ];
    default:
      return state;
  }

}

export default chat
