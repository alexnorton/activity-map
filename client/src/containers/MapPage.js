import React from 'react';
import { connect } from 'react-redux';
import ReactMapGL from 'react-map-gl';
import DeckGL, { GeoJsonLayer } from 'deck.gl';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import polyline from '@mapbox/polyline';
import PropTypes from 'prop-types';

import { fetchActivitiesFromCache } from '../actions';

class MapPage extends React.Component {
  static propTypes = {
    activities: PropTypes.shape().isRequired,
    fetchActivitiesFromCache: PropTypes.func.isRequired,
  };

  static getDerivedStateFromProps(nextProps) {
    const { activities } = nextProps;

    if (activities.fetched) {
      const features = Object.keys(activities.data)
        .filter(key => activities.data[key].polyline)
        .map((key) => {
          const activity = activities.data[key];

          return {
            type: 'Feature',
            geometry: polyline.toGeoJSON(activity.polyline),
            properties: {
              type: activity.type,
            },
          };
        });

      const geoJson = {
        type: 'FeatureCollection',
        features,
      };

      return { geoJson };
    }

    return null;
  }

  state = {
    viewport: {
      latitude: 51.507222,
      longitude: -0.1275,
      zoom: 10,
    },
  };

  componentDidMount() {
    this.props.fetchActivitiesFromCache();
  }

  handleViewportChange = viewport => this.setState({ viewport });

  render() {
    const { viewport, geoJson } = this.state;

    return (
      <div className="flex-grow-1">
        <AutoSizer>
          {({ height, width }) => (
            <ReactMapGL
              {...viewport}
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
              onViewportChange={this.handleViewportChange}
              height={height}
              width={width}
            >
              <DeckGL {...viewport} width={width} height={height}>
                <GeoJsonLayer
                  data={geoJson}
                  pickable
                  getLineColor={({ properties: { type } }) => {
                    switch (type) {
                      case 'Ride':
                        return [220, 53, 69, 255];
                      case 'Run':
                        return [0, 123, 255, 255];
                      default:
                        return [40, 167, 69, 255];
                    }
                  }}
                  getLineWidth={() => 2}
                  lineWidthMinPixels={0.7}
                />
              </DeckGL>
            </ReactMapGL>
          )}
        </AutoSizer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activities: state.activities,
});

const mapDispatchToProps = dispatch => ({
  fetchActivitiesFromCache: () => dispatch(fetchActivitiesFromCache()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
