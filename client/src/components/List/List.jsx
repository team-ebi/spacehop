import React, { useState, useContext } from "react";
import Data from "../../data/businesses";
import "./List.css";
import { BusinessContext } from "../useContext/BusinessContext";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faBuilding, faYenSign } from "@fortawesome/free-solid-svg-icons";

export default function List() {
  const { businesses, setBusinesses } = useContext(BusinessContext);
  const history = useHistory();

  return (
    <div id="list-container">
      <header>
        <h1>Check out these {businesses.length} spaces...</h1>
      </header>
      <div>
        <button id="back">Back to search</button>
      </div>
      <div id="location-container">
        {/* Mapping through businesses to display each bizcard */}
        {businesses.map((biz) => (
          <div
            className="location-cell"
            onClick={() => {
              history.push(`/booking/${biz.name}`, { state: biz });
            }}
          >
            <img
              className="business-image"
              src="https://media.timeout.com/images/105393878/image.jpg"
            />
            <div className="location-name">{biz.name}</div>
            <div className="location-city info">
            <FontAwesomeIcon
              className="icon"
              icon={faMapMarkerAlt}
              size="lg"
              color="#80CC37"
            />
              {biz.address_city}</div>
            <div className="location-type info">
            <FontAwesomeIcon
              className="icon"
              icon={faBuilding}
              size="lg"
              color="#80CC37"
            />
              {biz.business_type[0].toUpperCase() + biz.business_type.slice(1)}</div>
            <div className="location-price info" >
            <FontAwesomeIcon
              className="icon"
              icon={faYenSign}
              size="lg"
              color="#80CC37"
            />
              {Number(biz.price).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
