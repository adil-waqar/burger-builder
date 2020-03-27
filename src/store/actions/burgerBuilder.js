import * as actionTypes from './actionTypes';
import Axios from '../../axios';

export const addIngredient = ingredientName => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName
  };
};

export const removeIngredient = ingredientName => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName
  };
};

const initIngredients = ingredients => {
  return {
    type: actionTypes.INIT_INGREDIENTS,
    ingredients
  };
};

const initIngredientsFailed = () => {
  return {
    type: actionTypes.INIT_INGREDIENTS_FAILED
  };
};

export const getIngredients = () => {
  return dispatch => {
    Axios.get('/ingredients.json')
      .then(response => {
        dispatch(initIngredients(response.data));
      })
      .catch(_ => {
        dispatch(initIngredientsFailed());
      });
  };
};
