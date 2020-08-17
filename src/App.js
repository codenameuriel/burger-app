import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actionCreators from './store/actions/index';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route, Switch} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {
  componentDidMount() {
    /* 
    - handles auto signing in a user when the application page is reloaded
    - users' information is saved to local storage upon initial signing in to use when redux state information is lost on reload
    - will also check execute signing out if token has expired
    */
    this.props.onTryAutoSignIn();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth}/>
        <Route path="/" component={BurgerBuilder}/>
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/logout" component={Logout}/>
          <Route path="/orders" component={Orders}/>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/auth" component={Auth}/>
          <Route path="/" component={BurgerBuilder}/>
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
