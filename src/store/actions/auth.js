import * as actionTypes from './actionTypes';
import { apiKey } from '../../key';

import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

// sync action creators
const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: {
      idToken: token,
      userId: userId
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

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

// redux thunk middleware
const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};  

// async helper method
const authenticateUser = async(email, password, isSignedUp, dispatch) => {
  try {
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';

    if (isSignedUp) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
    }

    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    const response = await axios.post(`${url}${apiKey}`, authData);
    const idToken = response.data.idToken;
    const userId = response.data.localId;
    const expirationTime = response.data.expiresIn * 1000; // convert value to seconds

    console.log(response.data);
  
    dispatch(authSuccess(idToken, userId));
    dispatch(checkAuthTimeout(expirationTime));
  } catch (error) {
    // axios wraps response (Firebase's error) within an error object
    dispatch(authFail(error.response.data.error));
  }
};

// redux thunk middleware
export const auth =  (email, password, isSignedUp) => {
  return dispatch => {
    authenticateUser(email, password, isSignedUp, dispatch);
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    payload: {
      path: path
    }
  };
};
