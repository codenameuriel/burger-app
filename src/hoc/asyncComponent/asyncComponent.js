import React, { Component } from 'react';

const asyncComponent = (importComponent) => {
  return class extends Component {
    state = {
      component: null
    }

    async getComponent() {
      const WrappedComponent = await importComponent();

      this.setState({
        component: WrappedComponent.default
      });
    }

    componentDidMount() {
      this.getComponent();
    }

    render () {
      const WrappedComponent = this.state.component;

      return WrappedComponent ? <WrappedComponent {...this.props} /> : null;
    }
  }
};

export default asyncComponent;
