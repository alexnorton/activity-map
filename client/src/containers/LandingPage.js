import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchUser } from '../actions';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.fetchUser = this.fetchUser.bind(this);
  }

  fetchUser() {
    this.props.fetchUser();
  }

  render() {
    let userSection;

    if (this.props.user) {
      if (this.props.user.error) {
        userSection = `Error: ${this.props.user.error}`;
      } else if (this.props.user.isFetching) {
        userSection = 'Fetching user';
      } else if (this.props.user.loggedIn) {
        userSection = <Redirect to="/home" />;
      } else {
        userSection = 'Not logged in';
      }
    } else {
      userSection = 'User not fetched';
    }

    return (
      <div>
        <h2>Landing page</h2>
        <p>
          <Link to="/home">Login</Link>
        </p>
        {userSection}
      </div>
    );
  }
}

LandingPage.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  user: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LandingPage));
