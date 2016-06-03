import Chat from '../components/chat';
import {reset} from 'redux-form';
import {send} from '../actions/chat';
import trackEvent from './trackEvent';

const mapDispatchToProps = dispatch => {
  return {
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

