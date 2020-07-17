import React from 'react';
import ToolbarStyles from './Toolbar.module.css';

const Toolbar = props => {
  return (
   <header className={ToolbarStyles.Toolbar}>
     <div>MENU</div>
     <div>LOGO</div>
     <nav>...</nav>
   </header>
  );
}

export default Toolbar;
