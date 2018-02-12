import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchUser, logout } from '../actions';
import { userIsAuthenticated } from '../helpers/auth';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.logout();
  }

  render() {
    return (
      <div>
        Logged in
        <br />
        <button onClick={this.logout}>Logout</button>
        <br />
        <pre>{JSON.stringify(this.props.user, null, 2)}</pre>
      </div>
    );
  }
}

HomePage.propTypes = {
  user: PropTypes.shape().isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser()),
  logout: () => dispatch(logout()),
});

const connectedHomePage = connect(mapStateToProps, mapDispatchToProps)(HomePage);

export default userIsAuthenticated(withRouter(connectedHomePage));
