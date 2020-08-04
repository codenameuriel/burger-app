import * as actionTypes from './actionTypes';

export const addIngredient = ingredient => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    payload: {
      ingredient: ingredient
    }
  };
};

export const removeIngredient = ingredient => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    payload: {
      ingredient: ingredient
    }
  };
};
