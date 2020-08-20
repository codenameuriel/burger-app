import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import NavigationItemStyles from './NavigationItem.module.css';

const NavigationItem = props => {
  return (
    <li className={NavigationItemStyles.NavigationItem}>
      {/* exact only allows active class being set if the path is exact match */}
      <NavLink to={props.link} exact activeClassName={NavigationItemStyles.active}>{props.children}</NavLink>
    </li>
  );
}

export default withRouter(NavigationItem);
