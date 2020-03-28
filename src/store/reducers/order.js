import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  ordered: false,
  orders: null,
  error: null
};

const purchaseInit = state => {
  return {
    ...state,
    ordered: false
  };
};

const purchaseBurgerStart = state => {
  return {
    ...state,
    loading: true,
    ordered: false
  };
};

const purchaseBurgerSuccess = state => {
  return {
    ...state,
    loading: false,
    ordered: true
  };
};

const purchaseBurgerFail = state => {
  return {
    ...state,
    loading: false,
    ordered: false
  };
};

const getOrdersSuccess = (state, action) => {
  return {
    ...state,
    orders: action.orders
  };
};

const getOrdersFail = (state, action) => {
  return {
    ...state,
    error: action.error
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state);
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state);
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state);
    case actionTypes.GET_ORDERS_SUCCESS:
      return getOrdersSuccess(state, action);
    case actionTypes.GET_ORDERS_FAIL:
      return getOrdersFail(state, action);
    default:
      return state;
  }
};

export default reducer;
