import * as actionTypes from './actionTypes';
import { apiKey } from '../../key';

import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

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
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};  

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
    const expirationTime = response.data.expiresIn * 1000; 
    const expirationDate = new Date(new Date().getTime() + expirationTime);
    localStorage.setItem('token', idToken);
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('userId', userId);
  
    dispatch(authSuccess(idToken, userId));
    dispatch(checkAuthTimeout(expirationTime));
  } catch (error) {
    dispatch(authFail(error.response.data.error));
  }
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (new Date() >= expirationDate) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        const timeRemaining = expirationDate.getTime() - new Date().getTime();
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout(timeRemaining));
      }
    }
  };
};

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
