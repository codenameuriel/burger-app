import React from 'react';
import ToolbarStyles from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = props => {
  return (
   <header className={ToolbarStyles.Toolbar}>
     <DrawerToggle clicked={props.drawerToggleClicked}/>
     <div className={ToolbarStyles.Logo}>
      <Logo />
     </div>
     <nav className={ToolbarStyles.DesktopOnly}>
       <NavigationItems isAuth={props.isAuth}/>
     </nav>
   </header>
  );
}

export default Toolbar;
