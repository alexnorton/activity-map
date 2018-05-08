import React, { Fragment } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout as logoutAction } from '../actions';

const Navbar = ({ user, logout }) => (
  <nav className="navbar navbar-dark navbar-expand bg-success flex-shrink-0">
    <Link className="navbar-brand" to="/">Activity Map</Link>
    {user.loggedIn && (
      <Fragment>
        <div className="navbar-nav">
          <NavLink className="nav-link nav-item" activeClassName="active" to="/home">Home</NavLink>
          <NavLink className="nav-link nav-item" activeClassName="active" to="/map">Map</NavLink>
        </div>
        <button className="btn btn-outline-light ml-auto" onClick={logout}>Log out</button>
      </Fragment>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
