import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch, Redirect } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import { checkAuthState } from './store/actions';

class App extends Component {
  componentDidMount() {
    this.props.onStartup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" component={Auth} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/logout" component={Logout} />
          <Route path="/orders" exact component={Orders} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onStartup: () => dispatch(checkAuthState())
  };
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
