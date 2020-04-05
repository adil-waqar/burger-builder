import React, { Component } from 'react';
import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import { purchaseBurger } from '../../../store/actions/index';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Enter name'
        },
        value: '',
        validation: {
          required: true
        },
        isValid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Enter email'
        },
        value: '',
        validation: {
          required: true
        },
        isValid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Enter Street'
        },
        value: '',
        validation: {
          required: true
        },
        isValid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Enter ZIP'
        },
        value: '',
        validation: {
          required: true,
          minLength: 3,
          maxLength: 5
        },
        isValid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Enter country'
        },
        value: '',
        validation: {
          required: true
        },
        isValid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        value: 'fastest',
        touched: false,
        isValid: true
      }
    },
    orderFormValid: false
  };

  orderHandler = e => {
    e.preventDefault();

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: this.state.orderForm.name.value,
        address: {
          street: this.state.orderForm.street.value,
          zipCode: this.state.orderForm.zipCode.value,
          country: this.state.orderForm.country.value
        },
        email: this.state.orderForm.email.value
      },
      deliveryMethod: this.state.orderForm.deliveryMethod.value,
      userId: this.props.userId
    };

    this.props.onPurchaseBurger(order);
  };

  inputHandler = event => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = {
      ...updatedOrderForm[event.target.name]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement['isValid'] = this.validator(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[event.target.name] = updatedFormElement;

    this.setState(
      {
        orderForm: updatedOrderForm
      },
      () => {
        let allValid = this.validateAll();
        this.setState({
          orderFormValid: allValid
        });
      }
    );
  };

  validator = (value, rules) => {
    if (!rules) return true;
    let isValid = true;
    if (rules.required) isValid = value.trim().length !== 0 && isValid;
    if (rules.minLength) isValid = value.length >= rules.minLength && isValid;
    if (rules.maxLength) isValid = value.length <= rules.maxLength && isValid;

    return isValid;
  };

  validateAll = () => {
    for (let element in this.state.orderForm) {
      if (!this.state.orderForm[element].isValid) return false;
    }
    return true;
  };

  render() {
    const inputs = [];
    for (let element in this.state.orderForm) {
      let {
        elementType,
        elementConfig,
        value,
        validation,
        touched,
        isValid
      } = this.state.orderForm[element];
      inputs.push(
        <Input
          invalid={!isValid}
          touched={touched}
          shouldValidate={validation}
          name={element}
          changed={this.inputHandler}
          key={element}
          elementType={elementType}
          elementConfig={elementConfig}
          value={value}
        />
      );
    }
    return this.props.loading ? (
      <Spinner />
    ) : this.props.ordered ? (
      <h1 style={{ textAlign: 'center' }}>Order successful!</h1>
    ) : (
      <div className={classes.ContactData}>
        <h4>Enter your contact details</h4>
        <form onSubmit={this.orderHandler}>
          {inputs}
          <Button disabled={!this.state.orderFormValid} BtnType="Success">
            ORDER
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    ordered: state.order.ordered,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPurchaseBurger: order => dispatch(purchaseBurger(order))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
