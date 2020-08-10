import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axiosInstance from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  // state = {
  //   orders: [],
  //   loading: true
  // }

  componentDidMount() {
    // this.getOrders();
    this.props.onFetchOrders(this.props.token);
  } 

  // async getOrders() {
  //   try {
  //     const fetchedOrders = [];
  //     // returns a JS object with Firebase IDs as key and order object as the value
  //     const orders = await (await axiosInstance.get('/orders.json')).data; // {dlfjdj: {}, djfdjfj: {}, etc...}

  //     for (let key in orders) {
  //       fetchedOrders.push({...orders[key], id: key});
  //     }

  //     this.setState({orders: fetchedOrders, loading: false});
  //   } catch (err) {
  //     this.setState({loading: false});
  //   }
  // }

  renderOrders() {
    return this.props.orders.map(order => {
      return (
        <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
      );
    });
  }

  render() {
    return (
      <div>
        {this.props.loading ? <Spinner /> : this.renderOrders()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token) => dispatch(actionCreators.fetchOrders(token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axiosInstance));
