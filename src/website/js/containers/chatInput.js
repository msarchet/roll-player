import React from 'react';
import { reduxForm } from 'redux-form';
export const fields = ['message'];

const chatForm = ({fields, handleSubmit}) => (
  <form onSubmit={handleSubmit}>
    <input type="text" placeholder="Message" {...fields.message} />
  </form> 
)

const chatInput = reduxForm({
  form: 'chatInput',
  fields 
})(chatForm)

export default chatInput

