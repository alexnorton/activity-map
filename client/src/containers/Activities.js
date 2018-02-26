import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchActivities } from '../actions';

class Activities extends React.Component {
  static propTypes = {
    activities: PropTypes.shape().isRequired,
    fetchActivities: PropTypes.func.isRequired,
  }

  fetchActivities = () => {
    this.props.fetchActivities();
  }

  render() {
    return (
      <Fragment>
        <button onClick={this.fetchActivities}>Fetch activities</button>
        <ul>
          {Object.keys(this.props.activities.data).map(id => (
            <li key={id}>{id}</li>
          ))}
        </ul>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  activities: state.activities,
});

const mapDispatchToProps = dispatch => ({
  fetchActivities: () => dispatch(fetchActivities()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Activities);
