import React from 'react';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import LandingPage from './LandingPage';

const Root = ({ store }) => (
  <Provider store={store}>
    <div>
      <Route path="/" component={LandingPage} />
    </div>
  </Provider>
);

export default Root;