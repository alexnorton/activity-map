import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { increment } from '../actions';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.increment = this.increment.bind(this);
  }

  increment() {
    this.props.increment();
  }

  render() {
    return (
      <div>
        <p>Landing page</p>
        <p>
          Test value: {this.props.test}{' '}
          <button
            onClick={this.increment}
          >
            +
          </button>
        </p>
      </div>
    );
  }
}

LandingPage.propTypes = {
  test: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  test: state.test,
});

const mapDispatchToProps = dispatch => ({
  increment: () => dispatch(increment()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LandingPage));
