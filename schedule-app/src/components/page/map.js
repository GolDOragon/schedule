import React from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

const mapData = {
  center: [55.751574, 37.573856],
  zoom: 5,
};

const coordinate = [
  [55.684758, 37.738521]
];

const YandexMap = () => (
  <YMaps>
    <Map  defaultState={mapData}>
      <Placemark geometry={coordinate} />
    </Map>
  </YMaps>
);

export default YandexMap;