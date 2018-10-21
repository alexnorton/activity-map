import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchUser } from '../actions/user';
import { userIsAuthenticated } from '../helpers/auth';
import Activities from './Activities';

const HomePage = (props) => {
  const { givenName, familyName } = props.user.user.json.name;
  const name = `${givenName} ${familyName}`;

  return (
    <div className="container my-2">
      <h2 className="mb-4">Hello {name}!</h2>
      <Activities />
    </div>
  );
};

HomePage.propTypes = {
  user: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser()),
});

const connectedHomePage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);

export default withRouter(userIsAuthenticated(connectedHomePage));
