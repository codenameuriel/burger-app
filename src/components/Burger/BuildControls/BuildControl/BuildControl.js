import React from 'react';
import BuildControlStyles from './BuildControl.module.css';

const BuildControl = props => {
  return (
    <div className={BuildControlStyles.BuildControl}>
      <div className={BuildControlStyles.Label}>{props.label}</div>
      <button 
        className={BuildControlStyles.Less} 
        onClick={props.removeIngredient}
        // html property that will render button disabled if set to true
        disabled={props.zeroQuantity}>Less</button>
      <button 
        className={BuildControlStyles.More} 
        onClick={props.addIngredient}>More</button>
    </div>
  );
};

export default BuildControl;
