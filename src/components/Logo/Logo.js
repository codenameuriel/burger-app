import React from 'react';
import BurgerLogo from '../../assets/images/burger-logo.png';
import LogoStyles from './Logo.module.css';

const Logo = props => {
  return (
    <div className={LogoStyles.Logo} style={{backgroundColor: props.backgroundColor}}>
      <a href="/">
        <img src={BurgerLogo} alt="BurgerApp"/>
      </a>
    </div>
  );
}

export default Logo;
