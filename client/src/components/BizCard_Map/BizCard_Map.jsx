import React, {useState } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import flag from '../../images/registration-mark.png'; 


function BizCard_Map({props}){
    //shop data is in props. We can plot the spot
    //by accessing props.lat and props.lng 
    //for now, only Ebi-chan has location property
    console.log("props",props)

    //add lat, lng to props 
    props.location = [{ lat:35.659871, lng:139.700662 }]
    console.log("props added",props)
    console.log("props lat",props.location[0].lat)

    const[selected, setSelected]=useState({});

    const onSelect = item => {
        setSelected(item);
    };

    const mapStyles = {  
        margin:"0 auto",      
        height: "30vh",
        width: "100%"};
      
    //default center should be same as Biz card 
      const defaultCenter = {
        lat:props.location[0].lat, lng:props.location[0].lng
      }

      console.log("selected location", selected.location)
      return (
          <div className="BizCard-Map-container" style={{width:"95%", marginTop:"20px"}}>
              <GoogleMap
              mapContainerStyle={mapStyles}
              zoom={16}
              center={defaultCenter}>
                {/* tempolarly code ↓ */}
                <Marker
                key={props.name}
                position={defaultCenter}
                icon={flag}
                onClick ={
                    ()=>onSelect(props)
                } />
                  {selected.location &&
                  (
                      <InfoWindow
                    // if props has location like location:[{lat: ..., lng: ... )]
                      position={selected.location[0]}
                      clicable={true}
                      onCloseClick={
                          ()=>setSelected({})
                      }>
                      <p>Name: {props.name}</p>
                      </InfoWindow>
                  )}
              </GoogleMap>
          </div>
      )
}

export default BizCard_Map; 
