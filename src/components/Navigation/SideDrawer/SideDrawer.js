import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import SideDrawerStyles from './SideDrawer.module.css';

const SideDrawer = props => {
  return (
    <div className={SideDrawerStyles.SideDrawer}>
      <Logo height="11%"/>
      <nav>
        <NavigationItems />
      </nav>
    </div>
  );
}

export default SideDrawer;
