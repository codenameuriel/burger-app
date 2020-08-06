import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

// sync action creators
const authSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: {
      authData: authData
    }
  };
};

const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    payload: {
      error: error
    }
  };
};

// async helper method
const authenticateUser = async(email, password, dispatch) => {
  try {
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB3J-sYDdaoEoDITO3KTNjVUSFG8JZiGeU', authData);
  
    dispatch(authSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(authFail(error));
  }
};

// redux thunk middleware
export const auth =  (email, password) => {
  return dispatch => {
    authenticateUser(email, password, dispatch);
  };
};
