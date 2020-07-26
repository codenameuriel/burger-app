import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import CheckoutSummaryStyles from './CheckoutSummary.module.css';

function CheckoutSummary(props) {
  return (
    <div className={CheckoutSummaryStyles.CheckoutSummary}>
      <h1>We hope you enjoy!</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={props.ingredients}/>
      </div>
      <Button btnType="Danger" clicked={props.cancelCheckout}>Cancel</Button>
      <Button btnType="Success" clicked={props.continueCheckout}>Continue</Button>
    </div>
  );
}

export default CheckoutSummary;
