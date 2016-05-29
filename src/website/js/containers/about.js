import React from 'react';
import {Link} from 'react-router';
import Icon from './icon';
import styles from '../../css/demo.css';
import FontAwesome from 'react-fontawesome';

const About = () => (
  <div className={styles.about}>
    <p>
      Something that I've been working on for a little while. Figure it would be good to get it out to the people. Watch here for more information, or go check out the github.
      <span><a href="http://github.com/msarchet/roll-player"><FontAwesome name='github' style={{paddingRight: '5px'}}/>Github</a></span>
    </p>
    <p>
      It'd be super cool if you want to sign up to my mailing list. <a href="http://eepurl.com/b3ByN1">Here</a>
    </p>
    <p>
      Follow me on the twitter if you want. 
    </p>
    <p>
    <FontAwesome name='twitter-square' style={{color: '#00aced', paddingRight: '5px'}}/><a href="http://twitter.com/msarchet">@msarchet</a>
    </p>
    <p>
      Written using <a href="http://nodejs.org">Node.js</a>, <a href="http://facebook.github.io/React">React</a>, <a href="https://github.com/css-modules/css-modules">CSS Modules</a>, <a href="http://webpack.github.io">Webpack</a>, <a href="http://www.gulpjs.com">Gulp</a>, <a href="http://socket.io">Socket.io</a>, <a href="http://expressjs.com">Express</a>, <a href="http://fontawesome.io">Font Awesome</a>, <a href="http://babeljs.io">Babel</a>, <a href="http://jadelang.org">Jade</a>, <a href="http://www.vim.org">Vim</a>
    </p>
    <p className={styles.column}>
      <Icon size={'80px'} link={`https://thenounproject.com/daandirk/`} /> From Daan Dirk at The Noun Project
    </p>
    <p>
      Probably far too much <a href="https://en.wikipedia.org/wiki/Coffee">Coffee</a>
    </p>
  </div>
)

export default About
