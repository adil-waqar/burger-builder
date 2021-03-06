import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../store/actions';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchasableState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  };

  orderNowHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.history.push('/auth');
    }
  };

  modelClosedHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  };

  render() {
    const disableInfo = { ...this.props.ingredients };
    for (let info in disableInfo) {
      disableInfo[info] = disableInfo[info] <= 0;
    }

    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          modelClosed={this.modelClosedHandler}
        >
          {this.state.loading ? (
            <Spinner />
          ) : this.props.ingredients ? (
            <OrderSummary
              purchaseCancelled={this.modelClosedHandler}
              purchaseContinued={this.purchaseContinueHandler}
              ingredients={this.props.ingredients}
              totalPrice={this.props.totalPrice}
            />
          ) : null}
        </Modal>
        {this.props.ingredients && !this.props.loading ? (
          <Fragment>
            <Burger ingredients={this.props.ingredients} />
            <BuildControls
              ingredientAdded={this.props.onIngredientAdded}
              ingredientRemoved={this.props.onIngredientRemoved}
              disableInfo={disableInfo}
              price={this.props.totalPrice}
              purchasable={this.updatePurchasableState(this.props.ingredients)}
              orderNow={this.orderNowHandler}
              isAuth={this.props.isAuthenticated}
            />
          </Fragment>
        ) : this.props.error ? (
          <p style={{ textAlign: 'center' }}>
            There was an error loading the ingredients!
          </p>
        ) : (
          <Spinner />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
    loading: state.auth.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingredient =>
      dispatch(burgerBuilderActions.addIngredient(ingredient)),
    onIngredientRemoved: ingredient =>
      dispatch(burgerBuilderActions.removeIngredient(ingredient)),
    onInitIngredients: () => dispatch(burgerBuilderActions.getIngredients()),
    onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
