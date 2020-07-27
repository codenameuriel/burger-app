import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axiosInstance from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    this.getOrders();
  } 

  async getOrders() {
    try {
      const fetchedOrders = [];
      // returns a JS object with Firebase IDs as key and order object as the value
      const orders = await (await axiosInstance.get('/orders.json')).data; // {dlfjdj: {}, djfdjfj: {}, etc...}
      for (let key in orders) {
        fetchedOrders.push({...orders[key], id: key});
      }

      console.log(orders);
      console.log(fetchedOrders);

      this.setState({orders: fetchedOrders, loading: false});
    } catch (err) {
      this.setState({loading: false});
    }
  }

  renderOrders() {
    return this.state.orders.map(order => {
      return (
        <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
      );
    })
  }

  render() {
    return (
      <div>
        {this.renderOrders()}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axiosInstance);
