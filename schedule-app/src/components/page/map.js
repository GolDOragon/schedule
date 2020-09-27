import React, { useEffect } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import ScheduleApiService from '../../services/scheduleApi-service';



const mapData = {
  center: [53.9000000, 27.5666700],
  zoom: 11,
};

const coordinate = [
  [53.9000000, 27.5666700]
];

const YandexMap = (props) => {
  const {map} = props;


  return (
    <YMaps>
      <Map style={{ width: 340, height: 240, margin: 'auto'}}defaultState={mapData}>
        <Placemark geometry={coordinate} />
      </Map>
    </YMaps>
  )
}
  


export default YandexMap;