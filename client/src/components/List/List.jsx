import React, { useState, useContext } from "react";
import Data from "../../data/businesses";
import { BusinessContext } from "../useContext/BusinessContext";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faBuilding,
  faYenSign,
} from "@fortawesome/free-solid-svg-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./List.css";
import Slider from "react-slick";
import logo from "../../images/logo.png";

export default function List() {
  const { businesses, setBusinesses } = useContext(BusinessContext);
  const history = useHistory();

  function handleEditSearch() {
    return history.push("/")
  };

  return (
    <div id="list-container">
      <div className="corner-logo-container">
        <img className="corner-logo" src={logo}></img>
      </div>
      <div className="back-button-container">
        <button id="back" onClick={handleEditSearch}>
          Edit search
        </button>
      </div>
      <header id="results-header-container">
        <h1 id="results-length">
          Check out these {businesses.length} spaces...
        </h1>
      </header>
      <Slider
        className="location-container"
        dots={true}
        slidesToShow={1}
        swipe={true}
      >
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
                color="darkslategrey"
              />
              {biz.address_city}
            </div>
            <div className="location-type info">
              <FontAwesomeIcon
                className="icon"
                icon={faBuilding}
                size="lg"
                color="darkslategrey"
              />
              {biz.business_type[0].toUpperCase() + biz.business_type.slice(1)}
            </div>
            <div className="location-price info">
              <FontAwesomeIcon
                className="icon"
                icon={faYenSign}
                size="lg"
                color="darkslategrey"
              />
              {Number(biz.price).toLocaleString()}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
