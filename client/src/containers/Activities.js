import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { fetchActivities } from '../actions/activities';
import { findAndUpdateActivities } from '../actions/update';

class Activities extends React.Component {
  static propTypes = {
    activities: PropTypes.shape().isRequired,
    fetchActivities: PropTypes.func.isRequired,
    findAndUpdateActivities: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchActivities();
  }

  render() {
    return (
      <Fragment>
        <h4>Activities</h4>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.props.findAndUpdateActivities}
        >
          Fetch new activities
        </button>
        <button type="button" className="btn" />
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.props.activities.data).map((id) => {
              const activity = this.props.activities.data[id];

              let type;

              switch (activity.type) {
                case 'Ride':
                  type = '🚴‍';
                  break;
                case 'Run':
                  type = '🏃‍';
                  break;
                case 'Hike':
                  type = '⛰';
                  break;
                default:
                  type = activity.type; // eslint-disable-line prefer-destructuring
              }

              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>
                    <Link to={`/activities/${id}`}>{activity.name}</Link>
                  </td>
                  <td>{type}</td>
                  <td className="text-nowrap">{activity.start_date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  activities: state.activities,
});

const mapDispatchToProps = dispatch => ({
  fetchActivities: () => dispatch(fetchActivities()),
  findAndUpdateActivities: () => dispatch(findAndUpdateActivities()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Activities);
