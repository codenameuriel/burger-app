import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 0
  }

  componentDidMount() {
    // parse search params
    const query = new URLSearchParams(this.props.location.search);
    const checkoutIngredients = {};
    let price = 0;

    for (let [key, value] of query.entries()) {
      if (key !== 'price') {
        checkoutIngredients[key] = parseInt(value, 10);
      } else {
        price = +value;
      }
    }
    this.setState({ingredients: checkoutIngredients, totalPrice: price});
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
        <Route 
          path={`${this.props.match.url}/contact-data`} 
          render={() => 
          <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice}/>
        }/>
      </div>
    );
  }
}

export default Checkout;
