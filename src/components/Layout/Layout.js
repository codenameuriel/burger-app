import React from 'react';
import Aux from '../../hoc/Aux';
import LayoutStyles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const Layout = props => {
  return (
    <Aux>
      <Toolbar />
      <div>SideDrawer, Backdrop</div>
      <main className={LayoutStyles.Content}>
        {props.children}
      </main>
    </Aux>
  );
};

export default Layout;
