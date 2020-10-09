import React, { useState,useContext } from "react";
import Data from "../../data/businesses";
import "./List.css";
import {BusinessContext} from "../useContext/BusinessContext";
import {useHistory} from 'react-router-dom';

export default function List() {
  const { businesses, setBusinesses } = useContext(BusinessContext);
  const history = useHistory();

  return (
    <div id="list-container">
      <h1>List View</h1>
      <div id="location-container">
        {/* Mapping through businesses to display on each bizcard */}
        {businesses.map((biz, index) => (
          <div id="location-cell"
          onClick={() => {history.push(`/booking/${biz.name}`, {state: biz})}}
          >
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

