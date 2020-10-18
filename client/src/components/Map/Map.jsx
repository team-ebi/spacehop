import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import flag from "../../images/hopper_flag.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapPin,
  faBuilding,
  faYenSign,
} from "@fortawesome/free-solid-svg-icons";

function Map({ businesses, forBizCard }) {
  // state for when a marker is selected
  const [selected, setSelected] = useState({});

  // intializing router
  const history = useHistory();

  //[we need modify here] temporarily I add picture image but it should be  removed later
  //add picture image
  selected.img = "https://i.ibb.co/zhvKgwy/1280px-Bar-P1030319.jpg";

  const mapStyles = {
    margin: "0 auto",
    height: "80vh",
    width: "100%",
    boxShadow: "0 4px 8px grey",
    marginBottom: "50px",
    borderRadius: "30px"
  };

  //default Center is set around Shibuya station
  const defaultCenter = {
    lat: 35.659871,
    lng: 139.700662,
  };

  return (
    <div id="map-container">
      {/* map through businesses to set markers on map */}
      <GoogleMap mapContainerStyle={mapStyles} zoom={16} center={defaultCenter}>
        {businesses.map((biz) => (
          <Marker
            key={biz.id}
            position={{ lat: biz.lat, lng: biz.lng }}
            icon={flag}
            // when user clicks on marker, updates selected state for info window
            onClick={() => setSelected(biz)}
          />
        ))}

        {/* when there's a selected location, display info window */}
        {selected.lat && selected.lng && !forBizCard && (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            clickable={true}
            onCloseClick={() => setSelected({})}
          >
            {/* if user clicks on info window, will open up business page */}
            <div
              onClick={() => {
                history.push(`/booking/${selected.name}`, { state: selected });
              }}
            >
              <div className="location-name">{selected.name}</div>
              <div>
                <img src={selected.img} className="map-window-img" />
              </div>
              <div className="location-city info">
                <FontAwesomeIcon
                  className="list-icon"
                  icon={faMapPin}
                  size="lg"
                  color="darkslategrey"
                />
                {selected.address_city}
              </div>
              <div className="location-type info">
                <FontAwesomeIcon
                  className="list-icon"
                  icon={faBuilding}
                  size="lg"
                  color="darkslategrey"
                />
                {selected.business_type[0].toUpperCase() +
                  selected.business_type.slice(1)}
              </div>
              <div className="location-price info">
                <FontAwesomeIcon
                  className="list-icon"
                  icon={faYenSign}
                  size="lg"
                  color="darkslategrey"
                />
                {Number(selected.price).toLocaleString()}
              </div>
            </div>
          </InfoWindow>
        )}
        {/* when there's a selected location, display info window */}
        {selected.lat && selected.lng && forBizCard && (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            clickable={true}
            onCloseClick={() => setSelected({})}
          >
            {/* if user clicks on info window, will open up business page */}
            <div>
              <div className="location-name">{selected.name}</div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

export default Map;
