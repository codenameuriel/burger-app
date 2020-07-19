import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axiosInstance from '../../axios-orders';

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
    totalPrice: 4, // base price
    purchasable: false,
    purchasing: false
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

    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = type => {
    const ingredientQuantity = this.state.ingredients[type];
    // prevent removing non-existing ingredients
    if (ingredientQuantity > 0) {
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

      this.updatePurchaseState(updatedIngredients);
    }
  }

  updatePurchaseState(ingredients) {
    const sum = 
      Object.keys(ingredients).map(ingredient => ingredients[ingredient]).reduce((acc, quantity) => acc += quantity, 0);

    this.setState({purchasable: sum > 0});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    alert('You continued!');
    // firebase special syntax for endpoint (node name + .json)
    // axiosInstance.post('/orders.json');

  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  render() {
    const zeroQuantityInfo = {...this.state.ingredients};

    // create a boolean valued ingredients object to disable 'less' button if true for zero quantity for specific ingredient
    for (let key in zeroQuantityInfo) zeroQuantityInfo[key] = zeroQuantityInfo[key] <= 0;

    return (
      <Aux>
        <Modal 
          purchasing={this.state.purchasing}
          closeModal={this.purchaseCancelHandler}>
          <OrderSummary 
            ingredients={this.state.ingredients} 
            price={this.state.totalPrice.toFixed(2)}
            continuePurchase={this.purchaseContinueHandler}
            cancelPurchase={this.purchaseCancelHandler}/>
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls 
          addIngredient={this.addIngredientHandler} 
          removeIngredient={this.removeIngredientHandler}
          zeroQuantityInfo={zeroQuantityInfo}
          price={this.state.totalPrice.toFixed(2)}
          purchasable={this.state.purchasable}
          purchaseHandler={this.purchaseHandler}/>
      </Aux>
    );
  }
}

export default BurgerBuilder;
