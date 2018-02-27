import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchActivities, refreshActivities } from '../actions';

class Activities extends React.Component {
  static propTypes = {
    activities: PropTypes.shape().isRequired,
    fetchActivities: PropTypes.func.isRequired,
    refreshActivities: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchActivities();
  }

  render() {
    return (
      <Fragment>
        <ul>
          {Object.keys(this.props.activities.data).map((id) => {
            const activity = this.props.activities.data[id];
            return <li key={id}>{id} - {activity.data.start_date} - {activity.data.name}</li>;
          })}
        </ul>
        <button onClick={this.props.refreshActivities}>Refresh activities</button>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  activities: state.activities,
});

const mapDispatchToProps = dispatch => ({
  fetchActivities: () => dispatch(fetchActivities()),
  refreshActivities: () => dispatch(refreshActivities()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Activities);
