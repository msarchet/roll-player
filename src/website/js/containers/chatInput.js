import React from 'react';
import FontAwesome from 'react-fontawesome';
import styles from '../../css/chatInput.css';

export const fields = ['message'];

class chatForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {message: ''}
  }

  setMessage(e) {
    this.setState({message: e.target.value});
  }

  handleSubmit(e) {
    this.setState({message: ''});
    e.preventDefault();
    this.props.onSubmit({message: this.state.message});
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit.bind(this)} className={styles.container}>
        <input type="text" placeholder="/roll 1d4" className={styles.input} onChange={this.setMessage.bind(this)} value={this.state.message}/>
        <button onClick={this.handleSubmit.bind(this)} className={styles.send} disabled={!(this.state.message)}>
          Roll
        </button>
      </form>
    )
  }
}

export default chatForm

