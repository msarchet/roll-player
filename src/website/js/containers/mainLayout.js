import React from 'react';
import {Link} from 'react-router';

import Sockets from './sockets';
import styles from '../../css/nav.css';
import Icon from './icon';

const MainLayout = ({children}) => (
  <div id="derp" className={styles.container}>
    <nav className={styles.navHeader}>
      <div className={styles.iconContainer}>
        <span className={styles.name}>Roll Player</span>
        <Icon className={styles.icon} size={'40px'} />
      </div>
      <div className={styles.navItem}>
        <Link className={styles.link} to="/">Home</Link>
      </div>
      <div className={styles.navItem}>
        <Link className={styles.link} to="/about">About</Link>
      </div>
      <div className={styles.navItem}>
        <div onClick={() => {
          window.openPane('characterSheet');
        }}>Characters</div>
      </div>
    </nav>
    <Sockets>
      <div className={styles.content}>
        {children}
      </div>
    </Sockets>
  </div>
);

export default MainLayout;
