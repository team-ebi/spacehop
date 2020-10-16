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

    //everytime when this page is rendered, update locations 
    //only selected data should be shown here □
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
                            }
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
                      <p>Name: {selected.name}</p>
                      </InfoWindow>
                  )}
              </GoogleMap>
          </div>
      )
}

export default Map; 
