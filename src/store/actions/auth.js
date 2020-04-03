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

    if (method === 'SIGNUP') {
      Axios.post(signUpURL, {
        email,
        password,
        returnSecureToken: true
      })
        .then(response => {
          const token = response.data.idToken;
          const userId = response.data.localId;
          dispatch(authSuccess(token, userId));
        })
        .catch(error => {
          dispatch(authFail(error.response.data.error));
        });
    } else {
      Axios.post(signInURL, {
        email,
        password,
        returnSecureToken: true
      })
        .then(response => {
          const token = response.data.idToken;
          const userId = response.data.localId;
          dispatch(authSuccess(token, userId));
          dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(error => {
          dispatch(authFail(error.response.data.error));
        });
    }
  };
};
