import React, { useState, useContext } from "react";
import { getSingleObject } from "../../utils/index";
import { BusinessContext } from "../useContext/BusinessContext";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapPin,
  faBuilding,
  faYenSign,
  faImages,
} from "@fortawesome/free-solid-svg-icons";
import cornerLogo from "../../images/spacehop-name.png";
import Map from "../Map/Map";
import Image from "../Image/Image";
import "./List.css";

export default function List() {
  const { businesses } = useContext(BusinessContext);

  const history = useHistory();
  const [displayMap, setDisplayMap] = useState(false);

  function handleEditSearch() {
    return history.push("/");
  }

  return (
    <div id="list-container">
      <div className="corner-logo-container list-logo">
        <img
          className="corner-logo web"
          alt="spacehop-logo"
          src={cornerLogo}
        ></img>
      </div>
      <div className="back-button-container">
        <button id="back" onClick={handleEditSearch}>
          Edit search
        </button>
      </div>
      <header id="results-header-container">
        <h1 id="results-length">
          {businesses.length === 0 &&
            "Sorry, no results. Please edit your search."}
          {businesses.length === 1 && "Check out this space..."}
          {businesses.length > 1 &&
            `Check out these ${businesses.length} spaces...`}
        </h1>
      </header>
      {businesses.length > 0 && (
        <div className="toggle-switch-container">
          <span className="toggle-text">List</span>
          <label className="switch">
            <input
              type="checkbox"
              onChange={() => setDisplayMap(!displayMap)}
            />
            <span className="slider round"></span>
          </label>
          <span className="toggle-text">Map</span>
        </div>
      )}
      {/* this div will display on web with min-width 700px */}
      <div id="location-container">
        {/* Mapping through businesses to display each bizcard */}
        {!displayMap &&
          businesses.map((biz) => (
            <div
              className="location-cell"
              // when user clicks on cell, they will be rerouted to
              // bizcard page and biz info will be passed to that component
              // as props
              key={biz.name + biz.id}
            >
              {biz.images.length === 0 && (
                <FontAwesomeIcon
                  icon={faImages}
                  size="8x"
                  color="darkslategrey"
                />
              )}
              {biz.images.length > 0 && (
                <Image photos={biz.images} bizId={biz.id} arrows={false} />
              )}
              <div
              className="bizcard-info"
                onClick={() => {
                  history.push(`/booking/${biz.name}`, { state: biz });
                }}
              >
                <div className="location-name">{biz.name}</div>
                <div className="location-city info listed-info">
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
                  {Number(biz.price).toLocaleString() + "/ hour"}
                </div>
              </div>
            </div>
          ))}
      </div>
      {displayMap && <Map businesses={businesses} forBizCard={false} />}
    </div>
  );
}
