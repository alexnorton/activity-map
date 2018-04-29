import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

import Navbar from './Navbar';
import LandingPage from './LandingPage';
import HomePage from './HomePage';
import { fetchUser } from '../actions';
import ActivityPage from './ActivityPage';

class Root extends React.Component {
  componentDidMount() {
    this.props.store.dispatch(fetchUser());
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <div>
          <Navbar />
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/home" component={HomePage} />
            <Route path="/activities/:id" component={ActivityPage} />
          </Switch>
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
