import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { increment } from '../actions';

class LandingPage extends React.Component {
  render() {
    return (
      <div>
        <p>Landing page</p>
        <p>
          Test value: {this.props.test}
          {' '}
          <button onClick={() => { this.props.increment() }}>+</button>
        </p>
      </div>
    )
  }
};

const mapStateToProps = (state) => ({
  test: state.test,
});

const mapDispatchToProps = (dispatch) => ({
  increment: () => dispatch(increment()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LandingPage));
