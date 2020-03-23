import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const logo = props => {
  return (
    <div className={classes.Logo}>
      <img alt="MyBurger" src={burgerLogo} />
    </div>
  );
};

export default logo;
