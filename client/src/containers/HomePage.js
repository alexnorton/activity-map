import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchUser, logout, API_BASE } from '../actions';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    if (!this.props.user.loggedIn) {
      this.props.fetchUser();
    }
  }

  logout() {
    this.props.logout();
  }

  render() {
    let userSection;

    if (this.props.user.fetched) {
      if (this.props.user.error) {
        userSection = `Error: ${this.props.user.error}`;
      } else if (this.props.user.isFetching) {
        userSection = 'Fetching user';
      } else if (this.props.user.loggedIn) {
        userSection = (
          <Fragment>
            Logged in
            <br />
            <button onClick={this.logout}>Logout</button>
            <br />
            <pre>{JSON.stringify(this.props.user, null, 2)}</pre>
          </Fragment>
        );
      } else {
        window.location = `${API_BASE}/user/login`;
      }
    } else {
      userSection = 'Not fetched';
    }

    return <div>{userSection}</div>;
  }
}

HomePage.propTypes = {
  fetchUser: PropTypes.func.isRequired,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
