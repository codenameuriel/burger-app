import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component {
  // state = {
  //   ingredients: {
  //     salad: 0,
  //     bacon: 0,
  //     cheese: 0,
  //     meat: 0
  //   },
  //   totalPrice: 0
  // }

  // componentDidMount() {
  //   // parse search params
  //   const query = new URLSearchParams(this.props.location.search);
  //   const checkoutIngredients = {};
  //   let price = 0;

  //   for (let [key, value] of query.entries()) {
  //     if (key !== 'price') {
  //       checkoutIngredients[key] = parseInt(value, 10);
  //     } else {
  //       price = +value;
  //     }
  //   }
  //   this.setState({ingredients: checkoutIngredients, totalPrice: price});
  // }

  cancelCheckout = () => {
    this.props.history.goBack();
  }

  continueCheckout = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    let summary = <Redirect to="/"/>;

    if (this.props.ings) {
      summary = (
        <div>
          <CheckoutSummary 
            ingredients={this.props.ings}
            cancelCheckout={this.cancelCheckout}
            continueCheckout={this.continueCheckout}/>
          <Route 
            path={`${this.props.match.url}/contact-data`}
            component={ContactData}/>
        </div>
      );
    }

    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients
  };
};

export default connect(mapStateToProps)(Checkout);
