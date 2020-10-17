import React, {useState } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import flag from '../../images/hopper_flag.png'; 


function BizCard_Map({bizData}){

    //add lat, lng to bizData temporarily 
    bizData.location_lat = 35.659871
    bizData.location_lng = 139.700662
    //add picture image 
    bizData.img ="https://i.ibb.co/zhvKgwy/1280px-Bar-P1030319.jpg"

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
        lat:bizData.location_lat, lng:bizData.location_lng
      }

      return (
          <div className="BizCard-Map-container" style={{width:"95%", marginTop:"20px"}}>
              <GoogleMap
              mapContainerStyle={mapStyles}
              zoom={16}
              center={defaultCenter}>
                <Marker
                key={bizData.name}
                position={defaultCenter}
                icon={flag}
                onClick ={
                    ()=>onSelect(bizData)
                } />



              </GoogleMap>
          </div>
      )
}

export default BizCard_Map; 
