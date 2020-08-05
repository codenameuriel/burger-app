import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axiosInstance from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
// 'withErrorHandler' is a function so imported with camel-case
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actionCreators from './../../store/actions/index'

class BurgerBuilder extends Component {
  state = {
    // base ingredients will be requested from Database
    // ingredients: null,
    // totalPrice: 4, // base price
    // purchasable: false,

    // UI state properties
    purchasing: false
    // loading: false,
    // error: false
  }

  componentDidMount() {
    // this.getIngredients();
    this.props.onInitIngredients();
  }

  // requesting data from database ingredients object with 4 k:v {meat: 0, salad: 0, cheese: 0, bacon: 0}
  // async getIngredients() {
  //   try {
  //     const ingredients = 
  //       await (await axiosInstance.get('/ingredients.json')).data;

  //       // Firebase reorders ingredients alphabetically affecting rendered order of ingredients
  //       const reorderedIngredients = {
  //         salad: ingredients.salad,
  //         bacon: ingredients.bacon,
  //         cheese: ingredients.cheese,
  //         meat: ingredients.meat
  //       };
    
  //     this.setState({ingredients: reorderedIngredients});
  //   } catch (err) {
  //     this.setState({error: true});
  //   }
  // }

  // addIngredientHandler = type => {
  //   const ingredientQuantity = this.state.ingredients[type];
  //   const updatedQuantity = ingredientQuantity + 1;
  //   const updatedIngredients = {...this.state.ingredients};
  //   updatedIngredients[type] = updatedQuantity;

  //   const ingredientPrice = INGREDIENT_PRICES[type];
  //   const originalTotal = this.state.totalPrice;
  //   const newTotal = originalTotal + ingredientPrice;

  //   this.setState({
  //     ingredients: updatedIngredients,
  //     totalPrice: newTotal
  //   });

  //   this.updatePurchaseState(updatedIngredients);
  // }

  // removeIngredientHandler = type => {
  //   const ingredientQuantity = this.state.ingredients[type];
  //   // prevent removing non-existing ingredients
  //   if (ingredientQuantity > 0) {
  //     const updatedQuantity = ingredientQuantity - 1;
  //     const updatedIngredients = {...this.state.ingredients};
  //     updatedIngredients[type] = updatedQuantity;

  //     const ingredientPrice = INGREDIENT_PRICES[type];
  //     const originalTotal = this.state.totalPrice;
  //     const newTotal = originalTotal - ingredientPrice;

  //     this.setState({
  //       ingredients: updatedIngredients,
  //       totalPrice: newTotal
  //     });

  //     this.updatePurchaseState(updatedIngredients);
  //   }
  // }

  updatePurchaseState(ingredients) {
    const sum = 
      Object.keys(ingredients).map(ingredient => ingredients[ingredient]).reduce((acc, quantity) => acc += quantity, 0);

    // this.setState({purchasable: sum > 0});
    return sum > 0;
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  // purchaseContinueHandler = () => {
  //   const queryParams = [];

  //   for (let ingredient in this.props.ings) {
  //     // encodes elements to allow use within a URL
  //     // bacon=1
  //     queryParams.push(`${encodeURIComponent(ingredient)}=${encodeURIComponent(this.props.ings[ingredient])}`);
  //   }
  //   queryParams.push(`price=${this.state.totalPrice}`);

  //   // bacon=1&cheese=2...
  //   const queryString = queryParams.join('&');

  //   this.props.history.push({
  //     pathname: '/checkout',
  //     search: `?${queryString}`
  //   });
  // }

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  renderOrderSummary() {
    let orderSummary = (
      <OrderSummary 
        ingredients={this.props.ings} 
        price={this.props.price.toFixed(2)}
        continuePurchase={this.purchaseContinueHandler}
        cancelPurchase={this.purchaseCancelHandler}/>
    );
      
    if (!this.props.ings) {
      orderSummary = <Spinner />;
    }

    return orderSummary;
  }
π
  renderBurgerAndControls() {
    let burger = null;
    // handle rendering of error on the BurgerBuilder component level 
    // also handled on the HOC withErrorHandler level
    let controls = this.props.error ? <p style={{textAlign: 'center'}}><strong>There were issues retreiving the ingredients from the database</strong></p> : <Spinner />;

    if (this.props.ings) {
      const zeroQuantityInfo = {...this.props.ings};

      // create a boolean valued ingredients object to disable 'less' button if true for zero quantity for specific ingredient
      for (let key in zeroQuantityInfo) {
        zeroQuantityInfo[key] = zeroQuantityInfo[key] <= 0;
      }

      burger = 
        <Burger ingredients={this.props.ings}/>;
      controls = 
        <BuildControls 
          addIngredient={this.props.onAddIngredient} 
          removeIngredient={this.props.onRemoveIngredient}
          zeroQuantityInfo={zeroQuantityInfo}
          price={this.props.price.toFixed(2)}
          purchasable={this.updatePurchaseState(this.props.ings)}
          purchaseHandler={this.purchaseHandler}/>;
    }

    return (
      <Aux>
        {burger}
        {controls}
      </Aux>
    );
  }

  render() {
    return (
      <Aux>
        <Modal 
          purchasing={this.state.purchasing}
          closeModal={this.purchaseCancelHandler}>
          {this.renderOrderSummary()}
        </Modal>
        {this.renderBurgerAndControls()}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: (ingredient) => dispatch(actionCreators.addIngredient(ingredient)),
    onRemoveIngredient: (ingredient) => dispatch(actionCreators.removeIngredient(ingredient)),
    onInitIngredients: () => dispatch(actionCreators.initIngredients())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosInstance));
