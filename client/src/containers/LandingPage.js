import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { increment, fetchUser } from '../actions';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.increment = this.increment.bind(this);
    this.fetchUser = this.fetchUser.bind(this);
  }

  increment() {
    this.props.increment();
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
        userSection = (
          <p>
            Logged in
            <br />
            <pre>{JSON.stringify(this.props.user, null, 2)}</pre>
          </p>
        );
      } else {
        userSection = 'Not logged in';
      }
    } else {
      userSection = 'User not fetched';
    }

    return (
      <div>
        <p>Landing page</p>
        <p>
          Test value: {this.props.test} <button onClick={this.increment}>+</button>
        </p>
        <p>
          <button onClick={this.fetchUser}>Login</button>
        </p>
        {userSection}
      </div>
    );
  }
}

LandingPage.propTypes = {
  test: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  user: PropTypes.shape.isRequired,
};

const mapStateToProps = state => ({
  test: state.test,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  increment: () => dispatch(increment()),
  fetchUser: () => dispatch(fetchUser()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LandingPage));
