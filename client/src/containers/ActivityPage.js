import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactMapGL from 'react-map-gl';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import polyline from '@mapbox/polyline';
import immutable from 'immutable';
import { fitBounds } from 'viewport-mercator-project';
import geojsonExtent from '@mapbox/geojson-extent';

import defaultStyle from '../map-style.json';

import { fetchActivity } from '../actions';

const MAP_HEIGHT = 500;
const MAP_MAX_FIT_WIDTH = 600;

class ActivityPage extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const activity = nextProps.activities && nextProps.activities.data[prevState.id];

    if (activity && activity.map) {
      const geoJson = polyline.toGeoJSON(activity.map.polyline);

      const extent = geojsonExtent(geoJson);
      const mapViewport = fitBounds({
        width: (window.innerWidth < MAP_MAX_FIT_WIDTH) ? window.innerWidth : MAP_MAX_FIT_WIDTH,
        height: MAP_HEIGHT,
        padding: 15,
        bounds: [
          [extent[0], extent[1]],
          [extent[2], extent[3]],
        ],
      });

      const mapStyle = immutable.fromJS({
        ...defaultStyle,
        sources: {
          ...defaultStyle.sources,
          activity: {
            type: 'geojson',
            data: geoJson,
          },
        },
        layers: [
          ...defaultStyle.layers,
          {
            id: 'activity',
            type: 'line',
            source: 'activity',
            paint: {
              'line-color': '#dc3545',
              'line-width': 4,
            },
            layout: {
              'line-cap': 'round',
            },
          },
        ],
      });

      return {
        mapStyle,
        mapViewport,
      };
    }

    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      id: props.match.params.id,
      mapViewport: {
        latitude: 51.507222,
        longitude: -0.1275,
        zoom: 10,
      },
    };
  }

  componentDidMount() {
    this.props.fetchActivity(this.state.id);
  }

  render() {
    const activity = this.props.activities.data[this.state.id];

    return activity && activity.map ? (
      <Fragment>
        <div style={{ width: '100%', height: `${MAP_HEIGHT}px` }}>
          <AutoSizer>
            {({ height, width }) => (
              <ReactMapGL
                {...this.state.mapViewport}
                mapStyle={this.state.mapStyle}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                onViewportChange={mapViewport => this.setState({ mapViewport })}
                height={height}
                width={width}
              />
            )}
          </AutoSizer>
        </div>
        <div className="container mt-2">
          <h2>{activity.name}</h2>
          <p>{activity.start_date}</p>
        </div>
      </Fragment>
    ) : null;
  }
}

ActivityPage.propTypes = {
  match: PropTypes.shape().isRequired,
  activities: PropTypes.shape().isRequired,
  fetchActivity: PropTypes.func.isRequired,
};

const mapStateToProps = ({ activities }) => ({
  activities,
});

const mapDispatchToProps = dispatch => ({
  fetchActivity: id => dispatch(fetchActivity(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityPage);
