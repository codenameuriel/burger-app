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

// global constant
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
} ;

class BurgerBuilder extends Component {
  state = {
    // base ingredients will be requested from Database
    ingredients: null,
    totalPrice: 4, // base price
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    this.getIngredients();
  }

  // requesting data from database ingredients object with 4 k:v {meat: 0, salad: 0, cheese: 0, bacon: 0}
  async getIngredients() {
    try {
      const ingredients = 
        await (await axiosInstance.get('/ingredients.json')).data;

        // Firebase reorders ingredients alphabetically affecting rendered order of ingredients
        const reorderedIngredients = {
          salad: ingredients.salad,
          bacon: ingredients.bacon,
          cheese: ingredients.cheese,
          meat: ingredients.meat
        };
    
      this.setState({ingredients: reorderedIngredients});
    } catch (err) {
      this.setState({error: true});
    }
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

  // purchaseContinueHandler = async() => {
  //   try {
  //     // alert('You continued!');
  //     this.setState({loading: true});
  //     const order = {
  //       ingredients: this.state.ingredients,
  //       price: this.state.totalPrice,
  //       // dummy data
  //       customer: {
  //         name: 'Uri Rod',
  //         address: {
  //           street: '111 Jersey Street',
  //           zipCode: 11177,
  //           country: 'USA'
  //         },
  //         email: 'test@test.com'
  //       },
  //       deliveryMethod: 'fastest'
  //     };

  //     // firebase special syntax for endpoint (node name + .json)
  //     const post = await axiosInstance.post('/orders.json', order);
  //     this.setState({loading: false, purchasing: false});
  //     console.log(post);

  //   } catch (err) {
  //     this.setState({loading: false, purchasing: false});
  //     console.log(err);
  //   }
  // }

  purchaseContinueHandler = () => {
    const queryParams = [];

    for (let ingredient in this.state.ingredients) {
      // encodes elements to allow use within a URL
      // bacon=1
      queryParams.push(`${encodeURIComponent(ingredient)}=${encodeURIComponent(this.state.ingredients[ingredient])}`);
    }

    // bacon=1&cheese=2...
    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: `?${queryString}`
    });
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  renderOrderSummary() {
    let orderSummary = (
      <OrderSummary 
        ingredients={this.state.ingredients} 
        price={this.state.totalPrice.toFixed(2)}
        continuePurchase={this.purchaseContinueHandler}
        cancelPurchase={this.purchaseCancelHandler}/>
    );
      
    if (this.state.loading || !this.state.ingredients) {
      orderSummary = <Spinner />;
    }

    return orderSummary;
  }

  renderBurgerAndControls() {
    let burger = null;
    // handle rendering of error on the BurgerBuilder component level 
    // also handled on the HOC withErrorHandler level
    let controls = this.state.error ? <p style={{textAlign: 'center'}}><strong>There were issues retreiving the ingredients from the database</strong></p> : <Spinner />;

    if (this.state.ingredients) {
      const zeroQuantityInfo = {...this.state.ingredients};

      // create a boolean valued ingredients object to disable 'less' button if true for zero quantity for specific ingredient
      for (let key in zeroQuantityInfo) {
        zeroQuantityInfo[key] = zeroQuantityInfo[key] <= 0;
      }

      burger = 
        <Burger ingredients={this.state.ingredients}/>;
      controls = 
        <BuildControls 
          addIngredient={this.addIngredientHandler} 
          removeIngredient={this.removeIngredientHandler}
          zeroQuantityInfo={zeroQuantityInfo}
          price={this.state.totalPrice.toFixed(2)}
          purchasable={this.state.purchasable}
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

export default withErrorHandler(BurgerBuilder, axiosInstance);
