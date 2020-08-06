import React from 'react';
import NavigationItemsStyles from './NavigationItems.module.css'
import NavigationItem from '../NavigationItem/NavigationItem';

const NavigationItems = () => {
  return (
    <ul className={NavigationItemsStyles.NavigationItems}>
      <NavigationItem link="/">Burger Builder</NavigationItem>
      <NavigationItem link="/orders">Orders</NavigationItem>
      <NavigationItem link="/auth">Authenticate</NavigationItem>
    </ul>
  );
}

export default NavigationItems;
