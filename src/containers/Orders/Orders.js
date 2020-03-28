import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { getOrders } from '../../store/actions';

export class Orders extends Component {
  state = {
    orders: null
  };

  componentDidMount() {
    this.props.onGetOrders();
  }

  render() {
    let orders = null;
    if (this.props.orders) {
      orders = this.props.orders.map(order => {
        return (
          <Order
            key={order.key}
            ingredients={order.data.ingredients}
            totalPrice={order.data.price}
          />
        );
      });
    } else {
      orders = <Spinner />;
    }

    return <div>{orders}</div>;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetOrders: () => dispatch(getOrders())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
