import React, {useState } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import flag from '../../images/hopper_flag.png'; 


function BizCard_Map({biz}){

    //add lat, lng to biz temporarily 
    biz.location = [{ lat:35.659871, lng:139.700662 }]
    //add picture image 
    biz.img ="https://i.ibb.co/zhvKgwy/1280px-Bar-P1030319.jpg"

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
        lat:biz.location[0].lat, lng:biz.location[0].lng
      }

      return (
          <div className="BizCard-Map-container" style={{width:"95%", marginTop:"20px"}}>
              <GoogleMap
              mapContainerStyle={mapStyles}
              zoom={16}
              center={defaultCenter}>
                <Marker
                key={biz.name}
                position={defaultCenter}
                icon={flag}
                onClick ={
                    ()=>onSelect(biz)
                } />



              </GoogleMap>
          </div>
      )
}

export default BizCard_Map; 
