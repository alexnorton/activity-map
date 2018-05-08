import React from 'react';
import { connect } from 'react-redux';
import ReactMapGL from 'react-map-gl';
import DeckGL, { LineLayer, ScatterplotLayer } from 'deck.gl';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';

class MapPage extends React.Component {
  state = {
    viewport: {
      latitude: 37.785164,
      longitude: -122.41669,
      zoom: 16.14044,
      bearing: -20.55991,
      pitch: 60,
    },
  };

  handleViewportChange = viewport => this.setState({ viewport });

  render() {
    const { viewport } = this.state;

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
              <DeckGL {...viewport} width={width} height={height} debug>
                <LineLayer
                  data={[
                    { sourcePosition: [-122.41669, 37.7883], targetPosition: [-122.41669, 37.781] },
                  ]}
                  strokeWidth={5}
                />
                <ScatterplotLayer
                  data={[{ position: [-122.41669, 37.79] }]}
                  radiusScale={100}
                  getColor={() => [0, 0, 255]}
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

export default connect(mapStateToProps)(MapPage);
