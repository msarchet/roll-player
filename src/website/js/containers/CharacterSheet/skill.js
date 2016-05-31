import React from 'react';
import styles from './skill.css';
const Skill = ({skill}) => (
  <div className={styles.container}>
    <div className={styles.label}>{skill.label}</div>
    <div className={styles.modifier}>{skill.modifier}</div>
  </div>
) 

export default Skill;
