import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Root from './containers/Root';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(
  <Router>
    <Root store={store} />
  </Router>,
  document.getElementById('root'),
);
