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
      {controls.map(ctrl => 
        <BuildControl 
          key={ctrl.label} 
          label={ctrl.label}
          addIngredient={() => props.addIngredient(ctrl.type)}
          removeIngredient={() => props.removeIngredient(ctrl.type)} />
      )}
    </div>
  );
};

export default BuildControls;
