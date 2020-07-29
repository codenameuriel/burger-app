import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import ContactDataStyles from './ContactData.module.css';
import axiosInstance from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Enter your name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Enter your email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Enter your street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      state : {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Enter your state'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Enter your zipcode'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: ''
      }
    },
    loading: false
  }

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      // remove whitespaces at beginning/end of input value
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  orderHandler = async(event) => {
    event.preventDefault();
    try {
      this.setState({loading: true});

      const formData = {};

      for (let formElementIdentifier in this.state.orderForm) {
        formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
      }

      const order = {
        ingredients: this.props.ingredients,
        price: this.props.price,
        orderData: formData
      };

      // Firebase special syntax for endpoint (node name + .json)
      axiosInstance.post('/orders.json', order);

      this.setState({loading: false});

      this.props.history.push('/');
    } catch (err) {
      this.setState({loading: false});
      console.log(err);
    }
  }

  inputChangedHandler = (event, inputIdentifier) => {
    // shallow clone
    const updatedOrderForm = {
      ...this.state.orderForm
    };

    // deep cloning of nested object
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    this.setState({orderForm: updatedOrderForm});
  }

  renderForm() {
    const formElements = [];

    for (let key in this.state.orderForm) {
      formElements.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    return (
      <form onSubmit={this.orderHandler}>
        {formElements.map(formElement => {
          return (
            <Input 
              key={formElement.id}
              label={formElement.id} 
              elementType={formElement.config.elementType} 
              elementConfig={formElement.config.elementConfig} 
              value={formElement.config.value}
              changed={event => this.inputChangedHandler(event, formElement.id)}/>
          );
        })}
        <Button btnType="Success">Place Order</Button>
      </form>
    );
  }

  renderView() {
    if (this.state.loading) {
      return <Spinner />;
    } else {
      return this.renderForm();
    }
  }

  render() {
    return (
      <div className={ContactDataStyles.ContactData}>
        <h4>Enter you Information</h4>
        {this.renderView()}
      </div>
    );
  }
}

export default withRouter(ContactData);
