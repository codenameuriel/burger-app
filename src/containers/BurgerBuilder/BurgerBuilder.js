import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axiosInstance from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionCreators from './../../store/actions/index'

export class BurgerBuilder extends Component {
  state = {
    purchasing: false
  }

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchaseState(ingredients) {
    const sum = 
      Object.keys(ingredients).map(ingredient => ingredients[ingredient]).reduce((acc, quantity) => acc += quantity, 0);

    return sum > 0;
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  }

  purchaseHandler = () => {
    if (this.props.isAuth) {
      this.setState({purchasing: true});
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
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
    let controls = this.props.error ? <p style={{textAlign: 'center'}}><strong>There were issues retreiving the ingredients from the database</strong></p> : <Spinner />;

    if (this.props.ings) {
      const zeroQuantityInfo = {...this.props.ings};
      
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
          purchaseHandler={this.purchaseHandler}
          isAuth={this.props.isAuth}/>;
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
    error: state.burgerBuilder.error,
    isAuth: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: (ingredient) => dispatch(actionCreators.addIngredient(ingredient)),
    onRemoveIngredient: (ingredient) => dispatch(actionCreators.removeIngredient(ingredient)),
    onInitIngredients: () => dispatch(actionCreators.initIngredients()),
    onSetAuthRedirectPath: (path) => dispatch(actionCreators.setAuthRedirectPath(path))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosInstance));
