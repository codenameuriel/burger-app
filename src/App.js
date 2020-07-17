import React, {Component} from 'react';
import AppContext from './context/app-context';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Backdrop from './components/UI/Backdrop/Backdrop';

class App extends Component {
  state = {
    purchasing: false
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    alert('You continued!');
  }

  render() {
    return (
      <div>
        <Layout>
          <Backdrop purchasing={this.state.purchasing} closeModal={this.purchaseCancelHandler}/>
          <AppContext.Provider 
            value={{
              purchasing: this.state.purchasing, 
              purchaseHandler: this.purchaseHandler,
              cancelPurchase: this.purchaseCancelHandler,
              continuePurchase: this.purchaseContinueHandler
              }}>
            <BurgerBuilder />
          </AppContext.Provider>
        </Layout>
      </div>
    );
  }
}

export default App;
