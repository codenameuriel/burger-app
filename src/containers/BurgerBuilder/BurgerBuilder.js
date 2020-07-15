import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

// global constant
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
} ;

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4 // base price
  }

  addIngredientHandler = type => {
    const ingredientQuantity = this.state.ingredients[type];
    const updatedQuantity = ingredientQuantity + 1;
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = updatedQuantity;

    const ingredientPrice = INGREDIENT_PRICES[type];
    const originalTotal = this.state.totalPrice;
    const newTotal = originalTotal + ingredientPrice;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newTotal
    });
  }

  removeIngredientHandler = type => {
    const ingredientQuantity = this.state.ingredients[type];
    const updatedQuantity = ingredientQuantity - 1;
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = updatedQuantity;

    const ingredientPrice = INGREDIENT_PRICES[type];
    const originalTotal = this.state.totalPrice;
    const newTotal = originalTotal - ingredientPrice;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newTotal
    });
  }

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls 
          addIngredient={this.addIngredientHandler} 
          removeIngredient={this.removeIngredientHandler}/>
      </Aux>
    );
  }
}

export default BurgerBuilder;
