import React from 'react';
import NavigationItemsStyles from './NavigationItems.module.css'
import NavigationItem from '../NavigationItem/NavigationItem';

const NavigationItems = () => {
  return (
    <ul className={NavigationItemsStyles.NavigationItems}>
      {/* boolean value for active is set to true */}
      <NavigationItem link="/" active>Burger Builder</NavigationItem>
      <NavigationItem>Checkout</NavigationItem>
    </ul>
  );
}

export default NavigationItems;
