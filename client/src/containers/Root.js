import React from 'react';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import LandingPage from './LandingPage';
import HomePage from './HomePage';
import { fetchUser } from '../actions';

class Root extends React.Component {
  componentDidMount() {
    this.props.store.dispatch(fetchUser());
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <div>
          <Route path="/" exact component={LandingPage} />
          <Route path="/home" component={HomePage} />
        </div>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.shape({
    dispatch: PropTypes.func,
  }).isRequired,
};

export default Root;
