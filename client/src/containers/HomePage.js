import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchUser, logout } from '../actions';
import { userIsAuthenticated } from '../helpers/auth';
import Activities from './Activities';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.logout();
  }

  render() {
    const { givenName, familyName } = this.props.user.user.json.name;
    const name = `${givenName} ${familyName}`;

    return (
      <div>
        <p>Hello {name}!</p>
        <p>
          <button onClick={this.logout}>Logout</button>
        </p>
        <Activities />
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

export default withRouter(userIsAuthenticated(connectedHomePage));
