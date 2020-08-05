import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-orders';

// synchronous action creators
const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    payload: {
      orderId: id,
      orderData: orderData
    }
  };
};

const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    payload: {
      error: error
    }
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

// async helper function
const placeOrder = async(dispatch, orderData) => {
  try {
    const postedOrder = await(await axiosInstance.post('/orders.json', orderData)).data;
    dispatch(purchaseBurgerSuccess(postedOrder.name, orderData));
  } catch (error) {
    dispatch(purchaseBurgerFail(error));
  }
};

// async middleware
export const purchaseBurger = orderData => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    placeOrder(dispatch, orderData);
  };
};

const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    payload: {
      orders: orders
    }
  };
};

const fetchOrdersFail = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    payload: {
      error: error
    }
  };
};

// async helper function
const getOrders = async(dispatch) => {
  try {
    const orders = await (await axiosInstance.get('/orders.json')).data;

    const fetchedOrders = [];

    for (let key in orders) {
      fetchedOrders.push({...orders[key], id: key});
    }

    dispatch(fetchOrdersSuccess(fetchedOrders));
  } catch (error) {
    dispatch(fetchOrdersFail(error));
  }
};

export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    getOrders(dispatch);
  };
};
