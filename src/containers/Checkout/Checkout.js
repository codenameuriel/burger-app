import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {
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
