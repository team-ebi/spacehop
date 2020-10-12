import React, { useState, useContext } from "react";
import Data from "../../data/businesses";
import { BusinessContext } from "../useContext/BusinessContext";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapPin,
  faBuilding,
  faYenSign,
} from "@fortawesome/free-solid-svg-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./List.css";
import Slider from "react-slick";
import logo from "../../images/logo.png";

export default function List() {
  const { businesses } = useContext(BusinessContext);
  const history = useHistory();

  function handleEditSearch() {
    return history.push("/");
  }

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
          {businesses.length === 0 && "Sorry, no results. Please edit your search."}
          {businesses.length === 1 && "Check out this space..."}
          {businesses.length > 1 && `Check out these ${businesses.length} spaces...`}
        </h1>
      </header>

      {/* this div will display on web with min-width 700px */}
      <div id="location-container">
        {/* Mapping through businesses to display each bizcard */}
        {businesses.map((biz) => (
          <div
            className="location-cell"
            // when user clicks on cell, they will be rerouted to
            // bizcard page and biz info will be passed to that component
            // as props
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
                className="list-icon"
                icon={faMapPin}
                size="lg"
                color="darkslategrey"
              />
              {biz.address_city}
            </div>
            <div className="location-type info">
              <FontAwesomeIcon
                className="list-icon"
                icon={faBuilding}
                size="lg"
                color="darkslategrey"
              />
              {biz.business_type[0].toUpperCase() + biz.business_type.slice(1)}
            </div>
            <div className="location-price info">
              <FontAwesomeIcon
                className="list-icon"
                icon={faYenSign}
                size="lg"
                color="darkslategrey"
              />
              {Number(biz.price).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <div id="mobile-location-container">
        <Slider dots={true} slidesToShow={1} swipe={true}>
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
                  className="list-icon"
                  icon={faMapPin}
                  size="lg"
                  color="darkslategrey"
                />
                {biz.address_city}
              </div>
              <div className="location-type info">
                <FontAwesomeIcon
                  className="list-icon"
                  icon={faBuilding}
                  size="lg"
                  color="darkslategrey"
                />
                {biz.business_type[0].toUpperCase() +
                  biz.business_type.slice(1)}
              </div>
              <div className="location-price info">
                <FontAwesomeIcon
                  className="list-icon"
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
    </div>
  );
}
