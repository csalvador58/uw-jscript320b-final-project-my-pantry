import React from 'react';
import classes from '../css/FadeCard.module.css';
import PropTypes from 'prop-types';

function FadeCard({ children }) {
  return <div className={classes['fade-container']}>{children}</div>;
}

export default FadeCard;

FadeCard.propTypes = {
  children: PropTypes.node.isRequired,
};
