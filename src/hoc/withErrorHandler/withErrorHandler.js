// create a higher order anonymous Class componentm (class factory) that is returned upon receiving another component as an argument

// withErrorHandler hoc will repurpose the Modal component to display errors that occur with the component it wraps

// the hoc receives props that the wrapped component would otherwise receive from its parent component and passes it back to the wrapped component

// destructuring the props object and passing back down each prop to the wrapped component just as they are defined within the parent component 

// pass the axios global object or the instance to allow for global error handling functionality

import React, {Component} from 'react';
import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';
import axiosInstance from '../../axios-orders';

const withErrorHandler = (WrappedComponent, axios) => {
  // returned HOC
  return class extends Component {
    state = {
      error: null
    }

    // changed from componentDidMount
    // ** interceptors setup needs to happen before the children components execute their componentDidMount lifecycle method which makes a GET request to the database
    // want to handle errors within HOC
    UNSAFE_componentWillMount() {
      // setting up interceptors to execute upon each request and response

      // upon each request will clear past response errors to allow for new errors from responses
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      });

      // will handle errors that occur from the response of an HTTP request
      // the error object received will be saved to state
      // error object has a 'message' property that can be logged to see the error
      // have to return the response
      this.respInterceptor = axios.interceptors.response.use(resp => resp, error => {
        this.setState({error: error});
      });
    }

    // dismissing error modal view on click on the Backdrop
    errorConfirmedHandler = () => {
      this.setState({error: null});
    }

    componentWillUnmount() {
      axiosInstance.interceptors.request.eject(this.reqInterceptor);
      axiosInstance.interceptors.response.eject(this.respInterceptor);
    }

    render() {
      console.log('inside render', this.state)
      return (
        <Aux>
          <Modal purchasing={this.state.error} closeModal={this.errorConfirmedHandler}>
            {/* will have 'message' property returned from Firebase */}
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props}/>
        </Aux>
      );
    }
  }
};

export default withErrorHandler;
