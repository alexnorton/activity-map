import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout as logoutAction } from '../actions';

const Navbar = ({ user, logout }) => (
  <nav className="navbar navbar-dark bg-success">
    <Link className="navbar-brand" to="/">Activity Map</Link>
    {user.loggedIn && (
      <button className="btn btn-outline-light" onClick={logout}>Log out</button>
    )}
  </nav>
);

Navbar.propTypes = {
  user: PropTypes.shape().isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
