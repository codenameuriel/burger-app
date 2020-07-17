import React from 'react';
import NavigationItemStyles from './NavigationItem.module.css';

const NavigationItem = props => {
  return (
    <li className={NavigationItemStyles.NavigationItem}>
      <a 
        href={props.link}
        className={props.active ? NavigationItemStyles.active : null}>{props.children}</a>
    </li>
  );
}

export default NavigationItem;
