import React from 'react';
import InputStyles from './Input.module.css';

const Input = props => {
  let inputElement;

  switch (props.elementType) {
    case ('input'):
      inputElement = <input 
                        className={InputStyles.InputElement} 
                        {...props.elementConfig} 
                        value={props.value}  
                        onChange={props.changed}/>;
      break;
    case ('textarea'): 
      inputElement = <textarea 
                        className={InputStyles.InputElement} 
                        {...props.elementConfig} 
                        value={props.value} 
                        onChange={props.changed}/>;
      break;
    case ('select'):
      inputElement = 
        <select 
          className={InputStyles.InputElement} 
          value={props.value} 
          onChange={props.changed}>
          {props.elementConfig.options.map(option => (
            <option key={option.displayValue} value={option.value}>{option.displayValue}</option>
          ))}
        </select>;
      break;
    default: 
      inputElement = 
        <input 
          className={InputStyles.InputElement} 
          {...props.elementConfig} 
          value={props.value} 
          onChange={props.changed}/>;
  }

  return (
    <div className={InputStyles.Input}>
      <label className={InputStyles.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
}

export default Input;
