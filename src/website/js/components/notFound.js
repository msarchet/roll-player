import React from 'react';
import styles from '../../css/notFound.css';
import {Link} from 'react-router';

const NotFound = () => (
    <div className={styles.container}>
        <div className={styles.message}>
            <div className={styles.grue}>
                You have wandered into a dark cave, and were eaten by a Grue.
            </div>
            <div className={styles.runaway}>
                <Link to="/">Run Home?</Link>
            </div>
        </div>
    </div>
);

export default NotFound
