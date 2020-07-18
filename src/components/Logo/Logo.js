import React from 'react';
import BurgerLogo from '../../assets/images/burger-logo.png';
import LogoStyles from './Logo.module.css';

const Logo = props => {
  return (
    // if Logo does not receive a background from parent component will default to Logo's CSS styling
    <div className={LogoStyles.Logo} style={{backgroundColor: props.backgroundColor}}>
      <a href="/">
        <img src={BurgerLogo} alt="BurgerApp"/>
      </a>
    </div>
  );
}

export default Logo;
