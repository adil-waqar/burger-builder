import React, { Fragment, Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    UNSAFE_componentWillMount() {
      this.reqInterceptors = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });

      this.resInterceptors = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptors);
      axios.interceptors.response.eject(this.resInterceptors);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Fragment>
          <Modal
            modelClosed={this.errorConfirmedHandler}
            show={this.state.error}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Fragment>
      );
    }
  };
};

export default withErrorHandler;
