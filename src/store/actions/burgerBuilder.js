import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-orders';

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

const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    payload: {
      ingredients: ingredients
    }
  };
};

const getIngredients = async(dispatch) => {
  try {
    const ingredients = await (await axiosInstance.get('/ingredients.json')).data;

    const reorderedIngredients = {
      salad: ingredients.salad,
      bacon: ingredients.bacon,
      cheese: ingredients.cheese,
      meat: ingredients.meat
    };

    dispatch(setIngredients(reorderedIngredients));
  } catch (error) {
    dispatch(fetchIngredientsFailed());
  }
};

export const initIngredients = () => {
  return dispatch => {
    getIngredients(dispatch)
  }
};
