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
const placeOrder = async(dispatch, token, orderData) => {
  try {
    // user must be authenticated to place an order
    const postedOrder = await(await axiosInstance.post(`/orders.json?auth=${token}`, orderData)).data;
    dispatch(purchaseBurgerSuccess(postedOrder.name, orderData));
  } catch (error) {
    dispatch(purchaseBurgerFail(error));
  }
};

// async middleware
export const purchaseBurger = (token, orderData) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    placeOrder(dispatch, token, orderData);
  };
};

// handles loading (fetching) phase to render Spinner component
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
const getOrders = async(token, userId, dispatch) => {
  try {
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;

    // add auth token received when logged on in Firebase
    // filtering the orders by the logged in user using the userId value
    const orders = await (await axiosInstance.get(`/orders.json${queryParams}`)).data;

    const fetchedOrders = [];

    for (let key in orders) {
      fetchedOrders.push({...orders[key], id: key});
    }

    dispatch(fetchOrdersSuccess(fetchedOrders));
  } catch (error) {
    dispatch(fetchOrdersFail(error));
  }
};

// redux middleware
export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    getOrders(token, userId, dispatch);
  };
};
