import React from 'react';
import { withRouter } from 'react-router-dom';
import { userIsNotAuthenticated } from '../helpers/auth';
import { API_BASE } from '../helpers/api';

const LandingPage = () => (
  <div>
    <h2>Landing page</h2>
    <p>
      <button
        onClick={() => {
          window.location = `${API_BASE}/user/login`;
        }}
      >
        Login
      </button>
    </p>
  </div>
);

export default withRouter(userIsNotAuthenticated(LandingPage));
