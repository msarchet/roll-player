const alert = (state = {}, action) => { 
  switch(action.type) {
    case 'NEW_ALERT':
      return action.data;
    default:
      return state;
  } 
}

export default alert
