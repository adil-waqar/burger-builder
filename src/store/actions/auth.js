import * as actionTypes from './actionTypes';
import Axios from 'axios';

const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};

const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId
  };
};

export const authLogout = () => {
  localStorage.removeItem('token');
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

const checkAuthTimeout = expiresIn => {
  return dispatch => {
    setTimeout(() => {
      dispatch(authLogout);
    }, expiresIn * 1000);
  };
};

export const auth = (email, password, method) => {
  return dispatch => {
    dispatch(authStart());
    // Setup Config
    const baseURL = 'https://identitytoolkit.googleapis.com/v1/accounts:';
    const apiKey = 'AIzaSyBuQ5xg0GDnXaQlCyPyhNQJ80HaSFhsWs4';
    const signInURL = baseURL + 'signInWithPassword?key=' + apiKey;
    const signUpURL = baseURL + 'signUp?key=' + apiKey;
    let url = null;

    if (method === 'SIGNUP') url = signUpURL;
    else url = signInURL;

    Axios.post(url, {
      email,
      password,
      returnSecureToken: true
    })
      .then(response => {
        const token = response.data.idToken;
        const userId = response.data.localId;
        dispatch(authSuccess(token, userId));
        localStorage.setItem('token', token);
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(error => {
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const checkAuthState = () => {
  return dispatch => {
    // dispatch(authStart());
    const apiKey = 'AIzaSyBuQ5xg0GDnXaQlCyPyhNQJ80HaSFhsWs4';
    const url =
      'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=' + apiKey;
    const token = localStorage.getItem('token');
    if (!token) return;
    Axios.post(url, {
      idToken: token
    })
      .then(response => {
        const userId = response.data.users[0].localId;
        dispatch(authSuccess(token, userId));
      })
      .catch(error => {
        dispatch(authFail(error));
        localStorage.removeItem('token');
      });
  };
};
