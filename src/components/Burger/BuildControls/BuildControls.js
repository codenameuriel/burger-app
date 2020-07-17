import React, {Component} from 'react';
import BuildControlsStyles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
import BackdropContext from '../../../context/backdrop-context';

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'}
];

class BuildControls extends Component {
  static contextType = BackdropContext;

  render() {
    return (
      <div className={BuildControlsStyles.BuildControls}>
        <p>Current Price: <strong>${this.props.price}</strong></p>
        {controls.map(ctrl => 
          <BuildControl 
            key={ctrl.label} 
            label={ctrl.label}
            addIngredient={() => this.props.addIngredient(ctrl.type)}
            removeIngredient={() => this.props.removeIngredient(ctrl.type)} 
            zeroQuantity={this.props.zeroQuantityInfo[ctrl.type]} />
        )}
        <button 
          className={BuildControlsStyles.OrderButton}
          onClick={this.context.purchaseHandler} 
          disabled={!this.props.purchasable}>Place Order</button>
      </div>
    );
  }
};

export default BuildControls;
