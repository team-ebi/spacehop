import React, { useState, useContext } from "react";
import Data from "../../data/businesses";
import List from "../List/List";
import './BizCard.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faYenSign,
  faMapPin,
} from "@fortawesome/free-solid-svg-icons";

export default function BizCard() {
  const [bizData, setBizData] = useState([
    {
      Name: "Ebi-Chan",
      Address: "3 Chome-12-1 Amanuma Suginami City, Tokyo 167-0032",
      Type: "Izakaya",
      Availability: "Monday",
      Price: 5000,
    },
  ]);

  return (
    <div id="bizcard-location-container">
      {bizData.map((biz, index) => (
        <div id="bizcard-location-cell">
          <img
            id="business-image"
            src="https://www.japan-guide.com/g9/2005_01b.jpg"
          />{" "}
          <br />
          <div id="bizcard-location-name">
            {biz.Name} <br />
          </div>
          <FontAwesomeIcon className="icon" icon={faMapPin} size="lg" color="#80CC37" />
          {biz.Address} <br />
          <FontAwesomeIcon className="icon"  icon={faBuilding} size="lg" color="#80CC37" />{" "}
          {biz.Type} <br />
          <div>Booking Details:</div>
          Availability:
          <select id="days">
            {/* loop through fetched data */}
            <option value="item">Monday</option>
          </select>{" "}
          <br />
          <FontAwesomeIcon className="icon"  icon={faYenSign} size="lg" color="#80CC37" />{" "}
          {biz.Price} <br />
          <input className="book-button" type="button" value="Book"></input>
        </div>
      ))}
    </div>
  );
}
