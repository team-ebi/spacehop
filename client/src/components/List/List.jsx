import React, { useState,useContext } from "react";
import Data from "../../data/businesses";
import "./List.css";
  // useContext
import {BusinessContext} from "../BusinessContext/BusinessContext";

export default function List() {
  //state for JSON data
  const [businesses, setBusinesses] = useContext(BusinessContext);



  return (
    <div>
      <h1>List View</h1>
      <div id="location-container">
        {/* Mapping through data to display on each bizcard */}
        {data.map((biz, index) => (
          <div id="location-cell">
            <img
              id="business-image"
              src="https://media.timeout.com/images/105393878/image.jpg"
            />{" "}
            <br />
            <span id="location-name">{biz.name}</span> <br />
            <img id="location-png" />
            {biz.business_type} <br />
            {/* mapping through week days to display each available day */}
            <br />
            <img id="location-png" />
            {biz.price} <br />
          </div>
        ))}
      </div>
    </div>
  );
}
