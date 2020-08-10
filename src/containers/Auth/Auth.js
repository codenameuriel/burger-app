import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import AuthStyles from './Auth.module.css';
import * as actionCreators from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';

export class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Enter your email'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Enter your password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignedUp: true
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        isSignedUp: !prevState.isSignedUp
      };
    });
  }

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      // remove whitespaces at beginning/end of input value
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.isEmail) {
      const pattern = (
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      );

      isValid = pattern.test(value) && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    
    return isValid;
  }

  submitHandler = (event) => {
    event.preventDefault();

    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignedUp);
  }

  renderForm() {
    const formElements = [];

    for (let key in this.state.controls) {
      formElements.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    return (
      <form onSubmit={this.submitHandler}>
        {formElements.map(formElement => {
          return (
            <Input 
              key={formElement.id}
              label={formElement.id} 
              elementType={formElement.config.elementType} 
              elementConfig={formElement.config.elementConfig} 
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={event => this.inputChangedHandler(event, formElement.id)}/>
          );
        })}
        <Button btnType="Success">Submit</Button>
      </form>
    );
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    };

    this.setState({controls: updatedControls});
  }

  renderErrorMessage() {
    let errorMessage = null;

    // accessing the 'error' object's message property from Firebase upon failure to authenticate user (signing up or signing in)
    if (this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      );
    }

    return errorMessage;
  }

  render() {
    let authRedirect = null;

    if (this.props.isAuth) authRedirect = <Redirect />;

    return (
      <div className={AuthStyles.Auth}>
        {authRedirect}
        <h2>{this.state.isSignedUp ? 'Sign In' : 'Sign Up'}</h2>
        {this.renderErrorMessage()}
        {this.props.loading ? <Spinner /> : this.renderForm()}
        <Button 
          clicked={this.switchAuthModeHandler}
          btnType="Danger">{this.state.isSignedUp ? 'Click to Sign Up' : 'Click to Sign In'}</Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignedUp) => dispatch(actionCreators.auth(email, password, isSignedUp))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
