import React from 'react';
import classes from '../css/FadeCard.module.css';

function FadeCard({ children }) {
  return <div className={classes['fade-container']}>{children}</div>;
}

export default FadeCard;
