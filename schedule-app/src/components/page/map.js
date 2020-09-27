import React, { useEffect } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import ScheduleApiService from '../../services/scheduleApi-service';



const mapData = {
  center: [55.751574, 37.573856],
  zoom: 5,
};

const coordinate = [
  [55.684758, 37.738521]
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