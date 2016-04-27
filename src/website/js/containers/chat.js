import {connect} from 'react-redux';
import Chat from '../chat';
import {reset} from 'redux-form';
import {send} from '../actions/chat';

const mapStateToProps = state => {
  return {
    chat: state.rollPlayApp.chat
  }
}

const mapDispatchToProps = dispatch => {
  return {
    send: (e) => {
      dispatch(send({message: e.message}));
      dispatch(reset('chatInput'));
    }
  }
}
const chat = connect(
  mapStateToProps,
  mapDispatchToProps  
)(Chat);

export default chat;

