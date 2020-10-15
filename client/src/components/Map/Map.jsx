import React,{useState, useEffect} from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import flag from '../../images/checked.png'; 

function Map(){
    const[selected, setSelected]=useState({});
    const onSelect = item => {
        setSelected(item);
    };

    //test 
    const locations = [
      {name:"Tokyo station",
      location:{
          lat:35.6809591,
          lng:139.7673068
      }
    }];

    const mapStyles = {        
        height: "100vh",
        width: "100%"};
      
      const defaultCenter = {
        lat:35.6809591, lng:139.7673068
      }

      return (
          <div>
              <GoogleMap
              mapContainerStyle={mapStyles}
              zoom={13}
              center={defaultCenter}>
                  {locations.map(item=>{
                      return(
                          <Marker
                          key={item.name}
                          position={item.location}
                          icon={flag}
                          onClick ={
                              ()=>onSelect(item)
                          } />
                      )
                  })}
                  {selected.location &&
                  (
                      <InfoWindow
                      position={selected.location}
                      clicable={true}
                      onCloseClick={
                          ()=>setSelected({})
                      }>
                          <p>{selected.name}</p>
                      </InfoWindow>
                  )}
              </GoogleMap>
          </div>
      )
}

export default Map; 
