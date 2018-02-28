import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchActivitiesFromCache, fetchActivitiesFromStrava } from '../actions';

class Activities extends React.Component {
  static propTypes = {
    activities: PropTypes.shape().isRequired,
    fetchActivitiesFromCache: PropTypes.func.isRequired,
    fetchActivitiesFromStrava: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchActivitiesFromCache();
  }

  render() {
    return (
      <Fragment>
        <ul>
          {Object.keys(this.props.activities.data).map((id) => {
            const activity = this.props.activities.data[id];
            return <li key={id}>{id} - {activity.start_date} - {activity.name}</li>;
          })}
        </ul>
        <button onClick={this.props.fetchActivitiesFromStrava}>Refresh activities</button>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  activities: state.activities,
});

const mapDispatchToProps = dispatch => ({
  fetchActivitiesFromCache: () => dispatch(fetchActivitiesFromCache()),
  fetchActivitiesFromStrava: () => dispatch(fetchActivitiesFromStrava()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Activities);
