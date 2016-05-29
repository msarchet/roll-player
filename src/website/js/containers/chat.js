import {connect} from 'react-redux';
import Chat from '../components/chat';
import {reset} from 'redux-form';
import {send} from '../actions/chat';
import trackEvent from './trackEvent';

const mapStateToProps = state => {
  return {
    chat: state.rollPlayApp.chat
  }
}

const mapDispatchToProps = dispatch => {
  return {
    send: (e) => {
      trackEvent({
        category: 'roll', 
        action: 'clicked',
        label: 'engagement'
      });
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

