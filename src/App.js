import React, {Component} from 'react';
import BackdropContext from './context/backdrop-context';
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

  render() {
    return (
      <div>
        <Layout>
          <Backdrop purchasing={this.state.purchasing} closeModal={this.purchaseCancelHandler}/>
          <BackdropContext.Provider value={{purchasing: this.state.purchasing, purchaseHandler: this.purchaseHandler}}>
            <BurgerBuilder />
          </BackdropContext.Provider>
        </Layout>
      </div>
    );
  }
}

export default App;
