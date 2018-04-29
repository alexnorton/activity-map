import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
        <h4>Activities</h4>
        <table className="table">
          <thead>
            <tr>
              <th>
                ID
              </th>
              <th>
                Name
              </th>
              <th>
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.props.activities.data).map((id) => {
              const activity = this.props.activities.data[id];
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td><Link to={`/activities/${id}`}>{activity.name}</Link></td>
                  <td className="text-nowrap">{activity.start_date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button
          className="btn btn-primary"
          onClick={this.props.fetchActivitiesFromStrava}
        >
          Refresh activities
        </button>
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
