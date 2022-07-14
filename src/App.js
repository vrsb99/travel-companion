import React, {useEffect, useState} from 'react';

import {CssBaseline, Grid} from '@material-ui/core';
import { getPlacesData } from './api';

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

const App = () => {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({lat: 0, lng: 0});
  const [bounds, setBounds] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords}) => {
      setCoordinates({lat: coords.latitude, lng: coords.longitude});
    });

  })

  useEffect(() => {
    console.log(coordinates, bounds);
    getPlacesData(bounds.sw,bounds.ne).then((data) => {
      console.log(data);
      setPlaces(data)});
  }, [bounds, coordinates]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container space={3} style={{width: "100%"}}>
        <Grid item xs={12} md={4}>
          <List places={places}/>
        </Grid>
        <Grid item xs={12} md={8}>
          <Map 
          setCoordinates={setCoordinates}
          setBounds={setBounds}
          coordinates={coordinates}
          />
        </Grid>
      </Grid>
      </>
  )
}

export default App;