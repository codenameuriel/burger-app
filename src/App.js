import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from './store/actions/index';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch, Redirect } from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const AsyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const AsyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const AsyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignIn();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={AsyncAuth}/>
        <Route exact path="/" component={BurgerBuilder}/>
        <Redirect to="/"/>
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/logout" component={Logout}/>
          <Route path="/orders" component={AsyncOrders}/>
          <Route path="/checkout" component={AsyncCheckout}/>
          <Route path="/auth" component={AsyncAuth}/>
          <Route exact path="/" component={BurgerBuilder}/>
          <Redirect to="/"/>
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignIn: () => dispatch(actionCreators.authCheckState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
