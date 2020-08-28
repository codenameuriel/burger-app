import React from 'react';
import InputStyles from './Input.module.css';

const Input = props => {
  let inputElement;
  const inputStyles = [InputStyles.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) inputStyles.push(InputStyles.Invalid);

  switch (props.elementType) {
    case ('input'):
      inputElement = <input 
                        className={inputStyles.join(' ')} 
                        {...props.elementConfig} 
                        value={props.value}  
                        onChange={props.changed}/>;
      break;
    case ('textarea'): 
      inputElement = <textarea 
                        className={inputStyles.join(' ')} 
                        {...props.elementConfig} 
                        value={props.value} 
                        onChange={props.changed}/>;
      break;
    case ('select'):
      inputElement = 
        <select 
          className={inputStyles.join(' ')} 
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
          className={inputStyles.join(' ')} 
          {...props.elementConfig} 
          value={props.value} 
          onChange={props.changed}/>;
  }

  return (
    <div className={InputStyles.Input}>
      {inputElement}
    </div>
  );
}

export default Input;
