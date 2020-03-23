import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/action';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: null
  };

  componentDidMount() {
    // axios
    //   .get('/ingredients.json')
    //   .then(res => {
    //     this.setState({ ingredients: res.data });
    //   })
    //   .catch(error => {
    //     this.setState({ error: error.message });
    //   });
    this.setState({ ingredients: this.props.ingredients });
  }

  updatePurchasableState = () => {
    const ingredients = { ...this.props.ingredients };
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({ purchasable: sum > 0 });
  };

  addIngredientHandler = type => {
    const ingredients = { ...this.state.ingredients };
    let totalPrice = this.state.totalPrice;
    totalPrice += INGREDIENT_PRICES[type];
    ingredients[type]++;
    this.setState({ ingredients, totalPrice }, () => {
      this.updatePurchasableState();
    });
  };

  removeIngredientHandler = type => {
    let ingredients = { ...this.state.ingredients };
    let totalPrice = this.state.totalPrice;
    ingredients[type]--;
    if (ingredients[type] < 0) return;
    totalPrice -= INGREDIENT_PRICES[type];
    this.setState({ ingredients, totalPrice }, () => {
      this.updatePurchasableState();
    });
  };

  orderNowHandler = () => {
    this.setState({ purchasing: true });
  };

  modelClosedHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout', {
      ingredients: this.state.ingredients,
      totalPrice: this.state.totalPrice
    });
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
          ) : this.state.ingredients ? (
            <OrderSummary
              purchaseCancelled={this.modelClosedHandler}
              purchaseContinued={this.purchaseContinueHandler}
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
            />
          ) : null}
        </Modal>
        {this.props.ingredients ? (
          <Fragment>
            <Burger ingredients={this.props.ingredients} />
            <BuildControls
              ingredientAdded={this.props.onIngredientAdded}
              ingredientRemoved={this.props.onIngredientRemoved}
              disableInfo={disableInfo}
              price={this.state.totalPrice}
              purchasable={this.state.purchasable}
              orderNow={this.orderNowHandler}
            />
          </Fragment>
        ) : this.state.error ? (
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
    ingredients: state.ingredients
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingredient =>
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingredient
      }),
    onIngredientRemoved: ingredient =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingredient
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
