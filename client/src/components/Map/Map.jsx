import React,{useState, useEffect, useContext} from 'react';
import { BusinessContext } from "../useContext/BusinessContext";
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import flag from '../../images/registration-mark.png'; 
import sampleData from "./sampledata.json"; 

function Map(){
    const { businesses } = useContext(BusinessContext);

    const[selected, setSelected]=useState({});
    const onSelect = item => {
        setSelected(item);
    };

    const [locations, setLocations] = useState([]); 

    //test 
    // const locations = [
    //   {name:"Tokyo station",
    //   location:{
    //       lat:35.6809591,
    //       lng:139.7673068
    //   }
    // }];


    //everytime when this page is rendered, update locations 

    useEffect(
        ()=>{
            function handleBusinesses(){
                // setLocations(businesses.map(item => {
                    console.log(sampleData);
                    setLocations(sampleData.map(item => {
                        console.log(item.name)
                        console.log(item.location[0].lat)
                        console.log("img",item.img); 

                    return (
                        {
                            "name":item.name,
                            "location":{
                                "lat":Number(item.location[0].lat),
                                "lng":Number(item.location[0].lng)
                            }
                        }
                    )
                }));
            }; 
            handleBusinesses()}, []
    )
    console.log(locations); 

    const mapStyles = {  
        margin:"0 auto",      
        height: "80vh",
        width: "80%"};
      
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
                          address_street={item.address_street}
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
                      <p>Name: {selected.name}</p>
                      </InfoWindow>
                  )}
              </GoogleMap>
          </div>
      )
}

export default Map; 
