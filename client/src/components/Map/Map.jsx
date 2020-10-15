import React,{useState, useEffect, useContext} from 'react';
import { BusinessContext } from "../useContext/BusinessContext";
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import flag from '../../images/registration-mark.png'; 

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
                setLocations(businesses.map(item => {
                    return (
                        {
                            name:item.name,
                            location:{
                                lat:item.lat,
                                lng:item.lng
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
