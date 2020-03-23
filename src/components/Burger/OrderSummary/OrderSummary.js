import React, { Fragment, Component } from 'react';
import Button from '../../UI/Button/Button';
import { withRouter } from 'react-router-dom';

class OrderSummary extends Component {
  checkoutHandler = () => {
    this.props.history.push({ pathname: '/checkout' });
  };

  goBackHandler = () => {
    this.props.history.push({ pathname: '/' });
  };

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
          {this.props.ingredients[igKey]}
        </li>
      );
    });

    return (
      <Fragment>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Bill: ${this.props.totalPrice.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button BtnType="Success" clicked={this.props.purchaseCancelled}>
          CANCEL
        </Button>
        <Button BtnType="Danger" clicked={this.props.purchaseContinued}>
          CONTINUE
        </Button>
      </Fragment>
    );
  }
}

export default withRouter(OrderSummary);
