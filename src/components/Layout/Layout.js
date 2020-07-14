import React from 'react';
import Aux from '../../hoc/Aux';
import LayoutStyles from './Layout.module.css';

const Layout = props => {
  return (
    <Aux>
      <div>Toolbar, SideDrawer, Backdrop</div>
      <main className={LayoutStyles.content}>
        {props.children}
      </main>
    </Aux>
  );
};

export default Layout;
