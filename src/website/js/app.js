import React from 'react';
import {Router, Route, browserHistory, Link} from 'react-router';
import FontAwesome from 'react-fontawesome';

import Chat from './containers/chat';
import Header from './containers/headers';
import NotFound from './components/notFound';
import Icon from './containers/icon';

import Sockets from './containers/sockets';
import styles from '../css/demo.css';

// this is all just for the demo
const ChatComponent = () => (
  <Sockets>
    <div className={styles.container}>
      <h1 className={styles.title}>Die Rolling Demo</h1>
      <div style={{display: 'inline-block'}}><span>Stay informed with an </span><a href="http://eepurl.com/b3ByN1">email</a></div>
      <p className={styles.helpText}> Mouse over results to see rolls</p>
      <Header />
      <Chat />
    </div>
  </Sockets>
)

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

const container = ({children}) => (
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <nav className={styles.navHeader}>
      <div className={styles.leftContainer}>
        <Link className={styles.link} to="/">Home</Link>
      </div>
      <div className={styles.iconContainer}>
        <Icon />
        Roll Player
      </div>
      <div className={styles.rightContainer}>
        <Link className={styles.link} to="/about">About</Link>
      </div>
    </nav>
    <div className={styles.content}>
      {children}
    </div>
  </div>
);

const App = () => (
    <Router history={browserHistory}>
      <Route component={container}>
        <Route path="/" component={ChatComponent} />
        <Route path="/about" component={About} />
      </Route>
      <Route path="*" component={NotFound} />
    </Router>
)

export default App
