import React from 'react';
import { reduxForm } from 'redux-form';
import styles from '../../css/chatInput.css';

export const fields = ['message'];

const chatForm = ({fields, handleSubmit}) => (
  <form onSubmit={handleSubmit} className={styles.container}>
    <input type="text" placeholder="Message" {...fields.message} className={styles.input}/>
  </form> 
)

const chatInput = reduxForm({
  form: 'chatInput',
  fields 
})(chatForm)

export default chatInput

