import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import togeojson from 'togeojson';
// import geojsonExtent from 'geojson-extent';
import turf from '@turf/turf';

import 'mapbox-gl/dist/mapbox-gl.css';

import config from './config';

mapboxgl.accessToken = config.mapboxAccessToken;

const map = new mapboxgl.Map({
  container: 'map',
  maxZoom: 19,
  style: 'mapbox://styles/mapbox/dark-v9',
  // style: {
  //   version: 8,
  //   sources: {
  //     'simple-tiles': {
  //       type: 'raster',
  //       tiles: [
  //         'http://a.tile.stamen.com/toner-lite/{z}/{x}/{y}@2x.png',
  //         'http://b.tile.stamen.com/toner-lite/{z}/{x}/{y}@2x.png',
  //         'http://c.tile.stamen.com/toner-lite/{z}/{x}/{y}@2x.png',
  //         'http://d.tile.stamen.com/toner-lite/{z}/{x}/{y}@2x.png',
  //       ],
  //       tileSize: 256,
  //     },
  //   },
  //   layers: [
  //     {
  //       id: 'simple-tiles',
  //       type: 'raster',
  //       source: 'simple-tiles',
  //       minzoom: 0,
  //       maxzoom: 22,
  //     },
  //   ],
  // },
});

map.on('load', () => {
  fetch('/rides.txt')
    .then(response => response.text())
    .then((text) => {
      const files = text.split('\n');

      const filePromises = files.map(file => (
        fetch(`/${file}`)
          .then(response => response.text())
      ));

      Promise.all(filePromises).then((filesContent) => {
        const features = filesContent.map((fileContent) => {
          const dom = (new DOMParser()).parseFromString(fileContent, 'text/xml');
          const geoJSON = togeojson.gpx(dom);

          return geoJSON.features[0];
        });

        const featureCollection = turf.featureCollection(features.slice(0, -1));

        console.log(featureCollection);

        map.addSource('tracks', {
          type: 'geojson',
          data: featureCollection,
        });

        map.addLayer({
          id: 'tracks',
          type: 'line',
          source: 'tracks',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#f4f',
            'line-width': 4,
            'line-opacity': 0.4,
          },
        });
      });
    });

    // map.fitBounds(geojsonExtent(geoJSON), { padding: 20, duration: 0 });
});
