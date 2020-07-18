import React from 'react';
import ButtonStyles from './Button.module.css';

const Button = props => {
  return (
    <button 
      className={[ButtonStyles.Button, ButtonStyles[props.btnType]].join(' ')} 
      onClick={props.clicked}>{props.children}</button>
  );
};

export default Button;
