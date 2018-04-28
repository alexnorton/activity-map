import React from 'react';
import { withRouter } from 'react-router-dom';
import { userIsNotAuthenticated } from '../helpers/auth';
import { API_BASE } from '../helpers/api';

const LandingPage = () => (
  <div className="container mt-2">
    <h2>Landing page</h2>
    <p>
      <button
        className="btn btn-primary"
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
