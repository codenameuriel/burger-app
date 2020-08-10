import React from 'react';
import NavigationItemsStyles from './NavigationItems.module.css'
import NavigationItem from '../NavigationItem/NavigationItem';

const NavigationItems = props => {
  return (
    <ul className={NavigationItemsStyles.NavigationItems}>
      <NavigationItem link="/">Burger Builder</NavigationItem>
      {props.isAuth ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
      {props.isAuth ? 
        <NavigationItem link="/logout">Sign Out</NavigationItem> : <NavigationItem link="/auth">Sign In</NavigationItem>
      }
    </ul>
  );
}

export default NavigationItems;
