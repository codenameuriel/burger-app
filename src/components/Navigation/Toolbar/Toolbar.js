import React from 'react';
import ToolbarStyles from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = props => {
  return (
   <header className={ToolbarStyles.Toolbar}>
     {/* component that toggle in the side drawer in and out */}
     <DrawerToggle clicked={props.drawerToggleClicked}/>
     <div className={ToolbarStyles.Logo}>
      <Logo />
     </div>
     {/* hide links when on mobile device */}
     <nav className={ToolbarStyles.DesktopOnly}>
       <NavigationItems />
     </nav>
   </header>
  );
}

export default Toolbar;
