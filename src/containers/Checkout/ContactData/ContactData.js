import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import ContactDataStyles from './ContactData.module.css';
import axiosInstance from '../../../axios-orders';

class ContactData extends Component {
  state = {
    name: 'uri rod',
    email: 'uri@gmail.com',
    address: {
      street: '39 some street',
      zipCode: '88811'
    },
    loading: false
  }

  orderHandler = async(event) => {
    event.preventDefault();
    try {
      this.setState({loading: true})
      const order = {
        ingredients: this.props.ingredients,
        price: this.props.price,
        customer: {
          name: this.state.name,
          address: this.state.address,
          email: this.state.email
        },
        deliveryMethod: 'fastest'
      };

      // firebase special syntax for endpoint (node name + .json)
      const post = await axiosInstance.post('/orders.json', order);
      this.setState({loading: false});
      this.props.history.push('/');
    } catch (err) {
      this.setState({loading: false});
      console.log(err);
    }
  }

  renderView() {
    if (this.state.loading) {
      return <Spinner />
    } else {
      return (
        <form>
          <input className={ContactDataStyles.Input} type="text" name="name" placeholder="Enter your name"/>
          <input className={ContactDataStyles.Input} type="email" name="email" placeholder="Enter your email"/>
          <input className={ContactDataStyles.Input} type="email" name="street" placeholder="Enter your Street"/>
          <input className={ContactDataStyles.Input} type="email" name="zipCode" placeholder="Enter your Zipcode"/>
          <Button btnType="Success" clicked={this.orderHandler}>Place Order</Button>
        </form>
      );
    }
  }

  render() {
    return (
      <div className={ContactDataStyles.ContactData}>
        <h4>Enter you Information</h4>
        {this.renderView()}
      </div>
    );
  }
}

export default withRouter(ContactData);
