import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  state ={
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    }
  }


  componentDidMount() {
    // parse search params
    const query = new URLSearchParams(this.props.location.search);
    const checkoutIngredients = {};
    for (let [key, value] of query.entries()) {
      checkoutIngredients[key] = parseInt(value, 10);
    }
    this.setState({ingredients: checkoutIngredients});
  }

  cancelCheckout = () => {
    this.props.history.goBack();
  }

  continueCheckout = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    return (
      <div>
        <CheckoutSummary 
          ingredients={this.state.ingredients}
          cancelCheckout={this.cancelCheckout}
          continueCheckout={this.continueCheckout}/>
      </div>
    );
  }
}

export default Checkout;
