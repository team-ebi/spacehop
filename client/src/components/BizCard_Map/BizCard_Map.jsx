import React, {useState } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import flag from '../../images/hopper_flag.png'; 


function BizCard_Map({props}){
    //[we need update here]
    //shop data is in the props. We can plot the spot
    //by accessing props.lat and props.lng when  backend modify data. 
    //for now, only Ebi-chan has location property
    console.log("props",props)

    //add lat, lng to props temporarily 
    props.location = [{ lat:35.659871, lng:139.700662 }]
    //add picture image 
    props.img ="https://i.ibb.co/zhvKgwy/1280px-Bar-P1030319.jpg"
    console.log("props added",props)
    console.log("props lat",props.location[0].lat)

    const[selected, setSelected]=useState({});

    const onSelect = item => {
        setSelected(item);
    };

    const mapStyles = {  
        margin:"0 auto",      
        height: "35vh",
        width: "100%"};
      
    //default center should be same as selected location 
      const defaultCenter = {
        lat:props.location[0].lat, lng:props.location[0].lng
      }

      return (
          <div className="BizCard-Map-container" style={{width:"95%", marginTop:"20px"}}>
              <GoogleMap
              mapContainerStyle={mapStyles}
              zoom={16}
              center={defaultCenter}>
                <Marker
                key={props.name}
                position={defaultCenter}
                icon={flag}
                onClick ={
                    ()=>onSelect(props)
                } />



              </GoogleMap>
          </div>
      )
}

export default BizCard_Map; 
