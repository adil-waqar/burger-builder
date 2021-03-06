import * as actionTypes from './actionTypes';
import Axios from '../../axios';

const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

const purchaseBurgerSuccess = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS
  };
};

const purchaseBurgerFail = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL
  };
};

const getOrdersSuccess = orders => {
  return {
    type: actionTypes.GET_ORDERS_SUCCESS,
    orders
  };
};

const getOrdersFail = error => {
  return {
    type: actionTypes.GET_ORDERS_FAIL,
    error
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const purchaseBurger = order => {
  return (dispatch, getState) => {
    dispatch(purchaseBurgerStart());
    Axios.post('/orders.json?auth=' + getState().auth.token, order)
      .then(response => {
        dispatch(purchaseBurgerSuccess());
      })
      .catch(_ => dispatch(purchaseBurgerFail()));
  };
};

export const getOrders = () => {
  return (dispatch, getState) => {
    let url =
      '/orders.json?auth=' +
      getState().auth.token +
      '&orderBy="userId"&equalTo="' +
      getState().auth.userId +
      '"';
    Axios.get(url)
      .then(({ data }) => {
        if (!data) {
          dispatch(getOrdersSuccess([]));
          return;
        }
        let orders = Object.keys(data).map(key => {
          return {
            data: data[key],
            key
          };
        });
        dispatch(getOrdersSuccess(orders));
      })
      .catch(error => {
        dispatch(getOrdersFail(error));
      });
  };
};
