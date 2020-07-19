import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';
 
const OrderSummary = props => {

    const ingredientSummary = 
      Object.keys(props.ingredients).map(ingredient => {
        return (
          <li style={{listStyle: 'decimal'}} key={ingredient}>
            <span style={{textTransform: 'capitalize'}}>{ingredient}</span>: {props.ingredients[ingredient]}
          </li>
        );
      });

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: ${props.price}</strong></p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={props.cancelPurchase}>Cancel</Button>
        <Button btnType="Success" clicked={props.continuePurchase}>Continue</Button>
      </Aux>
    );
};

export default OrderSummary;
