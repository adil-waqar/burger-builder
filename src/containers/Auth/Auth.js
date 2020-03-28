import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import { connect } from 'react-redux';
import { auth } from '../../store/actions';

export class Auth extends Component {
  state = {
    controls: {
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
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Enter password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        isValid: false,
        touched: false
      }
    }
  };
  inputHandler = event => {
    const updatedControls = { ...this.state.controls };
    const updatedFormElement = {
      ...updatedControls[event.target.name]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement['isValid'] = this.validator(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedControls[event.target.name] = updatedFormElement;

    this.setState({
      controls: updatedControls
    });
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
    for (let element in this.state.controls) {
      if (!this.state.controls[element].isValid) return false;
    }
    return true;
  };

  authHandler = event => {
    event.preventDefault();
    const email = this.state.controls.email.value;
    const password = this.state.controls.password.value;
    this.props.onAuth(email, password);
  };

  render() {
    const inputs = [];
    for (let element in this.state.controls) {
      let {
        elementType,
        elementConfig,
        value,
        validation,
        touched,
        isValid
      } = this.state.controls[element];
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
    return (
      <div className={classes.Form}>
        <form onSubmit={this.authHandler}>
          {inputs}
          <Button BtnType="Success">Submit</Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(auth(email, password))
  };
};

export default connect(null, mapDispatchToProps)(Auth);
