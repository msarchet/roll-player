import React from 'react';
import { reduxForm } from 'redux-form';
import FontAwesome from 'react-fontawesome';

import styles from '../../css/chatInput.css';

export const fields = ['message'];

const chatForm = ({fields, handleSubmit}) => (
  <form onSubmit={handleSubmit} className={styles.container}>
    <input type="text" placeholder="/roll 1d4" {...fields.message} className={styles.input}/>
    <button onClick={handleSubmit} className={styles.send} disabled={!(fields.message.value)}>
      Roll
    </button>
  </form> 
)

const chatInput = reduxForm({
  form: 'chatInput',
  fields 
})(chatForm)

export default chatInput

