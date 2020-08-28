import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-orders';

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

const placeOrder = async(dispatch, token, orderData) => {
  try {
    const postedOrder = await(await axiosInstance.post(`/orders.json?auth=${token}`, orderData)).data;
    dispatch(purchaseBurgerSuccess(postedOrder.name, orderData));
  } catch (error) {
    dispatch(purchaseBurgerFail(error));
  }
};

export const purchaseBurger = (token, orderData) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    placeOrder(dispatch, token, orderData);
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

const getOrders = async(token, userId, dispatch) => {
  try {
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;

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

export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    getOrders(token, userId, dispatch);
  };
};
