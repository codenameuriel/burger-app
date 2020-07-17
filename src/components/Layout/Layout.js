import React from 'react';
import Aux from '../../hoc/Aux';
import LayoutStyles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout = props => {
  return (
    <Aux>
      <Toolbar />
      <SideDrawer />
      <div>Backdrop</div>
      <main className={LayoutStyles.Content}>
        {props.children}
      </main>
    </Aux>
  );
};

export default Layout;
