import React,{useState, useEffect, useContext} from 'react';
import { BusinessContext } from "../useContext/BusinessContext";
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import flag from '../../images/hopper_flag.png'; 
import sampleData from "./sampledata.json"; 

function Map({bizImgPic}){
    const { businesses } = useContext(BusinessContext);

    const[selected, setSelected]=useState({});
    const onSelect = item => {
        setSelected(item);
    };

    const [locations, setLocations] = useState([]); 
    
    //[we need modify here] temporarily I add picture image but it should be  removed later 
    //add picture image 
    // selected.img ="https://i.ibb.co/zhvKgwy/1280px-Bar-P1030319.jpg"
    console.log("bizImgPic", bizImgPic[0]); 


    //everytime when this page is rendered, update locations 
    //[we need update here ] only selected data should be shown
    useEffect(
        ()=>{
            function handleBusinesses(){
                // setLocations(businesses.map(item => {
                    setLocations(sampleData.map(item => {

                    return (
                        {
                            "id":item.id,
                            "name":item.name,
                            "location":{
                                "lat":Number(item.location_lat),
                                "lng":Number(item.location_lng)
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
                        <img src={
                            selected.id===1 && bizImgPic[0] || 
                            selected.id===2 && bizImgPic[1] ||
                            selected.id===3 && bizImgPic[2] ||
                            selected.id===4 && bizImgPic[3] ||
                            selected.id===5 && bizImgPic[4] ||
                            selected.id===6 && bizImgPic[5] ||
                            selected.id===7 && bizImgPic[6] ||
                            selected.id===8 && bizImgPic[7] ||
                            selected.id===9 && bizImgPic[8] ||
                            selected.id===10 && bizImgPic[9]
                            } 
                            style={{width:"10",height:"auto"}} /><br/>
                            Price: {selected.price}<br/>
                            Capacity: {selected.capacity}</p>
                      </InfoWindow>
                  )}
              </GoogleMap>
          </div>
      )
}

export default Map; 
