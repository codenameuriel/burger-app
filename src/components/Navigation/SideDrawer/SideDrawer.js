import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import SideDrawerStyles from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const SideDrawer = props => {
  let attachedStyles = [SideDrawerStyles.SideDrawer, SideDrawerStyles.Close];

  if (props.open) {
    attachedStyles = [SideDrawerStyles.SideDrawer, SideDrawerStyles.Open];
  }

  return (
    <Aux>
      <Backdrop purchasing={props.open} closeModal={props.closed}/>
      <div className={attachedStyles.join(' ')} onClick={props.closed}>
        <div className={SideDrawerStyles.Logo}>
          <Logo backgroundColor="white"/>
        </div>
        <nav>
          <NavigationItems isAuth={props.isAuth}/>
        </nav>
      </div>
    </Aux>
  );
}

export default SideDrawer;
