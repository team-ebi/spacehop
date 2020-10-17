import React,{useState, useEffect, useContext} from 'react';
import { BusinessContext } from "../useContext/BusinessContext";
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import flag from '../../images/hopper_flag.png'; 
import sampleData from "./sampledata.json"; 

function Map(){
    const { businesses } = useContext(BusinessContext);

    const[selected, setSelected]=useState({});
    const onSelect = item => {
        setSelected(item);
    };

    const [locations, setLocations] = useState([]); 
    
    //[we need modify here] temporarily I add picture image but it should be  removed later 
    //add picture image 
    selected.img ="https://i.ibb.co/zhvKgwy/1280px-Bar-P1030319.jpg"
    console.log("selected?", selected); 


    //everytime when this page is rendered, update locations 
    //[we need update here ] only selected data should be shown
    useEffect(
        ()=>{
            function handleBusinesses(){
                // setLocations(businesses.map(item => {
                    setLocations(sampleData.map(item => {

                    return (
                        {
                            "name":item.name,
                            "location":{
                                "lat":Number(item.location[0].lat),
                                "lng":Number(item.location[0].lng)
                            },
                            "price":item.price,
                            "capacity":item.capacity
                        }
                    )
                }));
            }; 
            handleBusinesses()}, []
    )

    const mapStyles = {  
        margin:"0 auto",      
        height: "80vh",
        width: "80%"};
      
        //default Center is set around Shibuya station 
      const defaultCenter = {
        lat:35.659871, lng:139.700662
      }

      return (
          <div>
              <GoogleMap
              mapContainerStyle={mapStyles}
              zoom={16}
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
                        <p>Name: {selected.name}<br/>
                        {<img src={selected.img} style={{width:"10",height:"auto"}} />}<br/>
                        Price: {selected.price}<br/>
                        Capacity: {selected.capacity}</p>
                      </InfoWindow>
                  )}
              </GoogleMap>
          </div>
      )
}

export default Map; 
