import React from 'react';
import {Link} from 'react-router';

const Icon = ({size, link}) => (
  <Link to={link || `/`}>
    <img style={{height: size || '40px'}} src='/static/images/logo.svg' alt='roll player'></img>  
  </Link>
)

export default Icon
