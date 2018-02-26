import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchActivities } from '../actions';

class Activities extends React.Component {
  static propTypes = {
    activities: PropTypes.shape().isRequired,
    fetchActivities: PropTypes.func.isRequired,
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
            return <li key={id}>{id} - {activity.start_date} - {activity.name}</li>;
          })}
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
