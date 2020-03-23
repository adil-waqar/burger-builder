import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

export class Orders extends Component {
  state = {
    orders: null
  };

  componentDidMount() {
    axios
      .get('/orders.json')
      .then(({ data }) => {
        let orders = Object.keys(data).map(key => {
          return {
            data: data[key],
            key
          };
        });
        this.setState({ orders });
      })
      .catch(_ => {});
  }

  render() {
    let orders = null;
    if (this.state.orders) {
      orders = this.state.orders.map(order => {
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

export default withErrorHandler(Orders, axios);
