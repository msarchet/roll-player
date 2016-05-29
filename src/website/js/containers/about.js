import React from 'react';
import {Link} from 'react-router';
import Icon from './icon';
import styles from '../../css/demo.css';
import FontAwesome from 'react-fontawesome';

const About = () => (
  <div className={styles.about}>
    <p>
      Something that I've been working on for a little while. Figure it would be good to get it out to the people. Watch here for more information, or go check out the github.
      <a href="http://github.com/msarchet/roll-player">Github</a>
    </p>
    <p>
    </p>
    <p>
      Follow me on the twitter if you want. 
    </p>
    <p>
    <FontAwesome name='twitter-square' style={{color: '#00aced', paddingRight: '5px'}}/><a href="http://twitter.com/msarchet">@msarchet</a>
    </p>
    <p>
      Written using <a href="http://nodejs.org">Node.js</a>, <a href="http://facebook.github.io/React">React</a>, <a href="https://github.com/css-modules/css-modules">CSS Modules</a>, <a href="">Webpack</a>, <a href="http://www.gulpjs.com">Gulp</a>
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
