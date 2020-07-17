import React from 'react';
import ToolbarStyles from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const Toolbar = props => {
  return (
   <header className={ToolbarStyles.Toolbar}>
     <div>MENU</div>
     {/* adjusting height based on specific dimensions of Toolbar */}
     <Logo height="90%"/>
     <nav>
       <NavigationItems />
     </nav>
   </header>
  );
}

export default Toolbar;
