import React from 'react';
import BuildControlsStyles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'}
];

const BuildControls = props => {
  return (
    <div className={BuildControlsStyles.BuildControls}>
      <p>Current Price: <strong>${props.price}</strong></p>
      {controls.map(ctrl => 
        <BuildControl 
          key={ctrl.label} 
          label={ctrl.label}
          addIngredient={() => props.addIngredient(ctrl.type)}
          removeIngredient={() => props.removeIngredient(ctrl.type)} 
          zeroQuantity={props.zeroQuantityInfo[ctrl.type]} />
      )}
      <button 
        className={BuildControlsStyles.OrderButton} 
        disabled={!props.purchasable}>Place Order</button>
    </div>
  );
};

export default BuildControls;
