import React, { useContext } from "react";
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
import Map from "../Map/Map"; 

export default function List() {
  const { businesses } = useContext(BusinessContext);
  const history = useHistory();

  function handleEditSearch() {
    return history.push("/");
  }
  
  //add images to businesses 
  const bizImg=[
  "https://i.ibb.co/0yRnM5f/patrick-tomasso-GXXYk-Swnd-P4-unsplash.jpg",
  "https://i.ibb.co/VLqdZxn/news-img-20181031133646137.jpg",
  "https://i.ibb.co/x200FqT/file-20200624-132988-168jsqs.jpg",
  "https://i.ibb.co/34NSdGZ/eyecatch-1.jpg",
  "https://i.ibb.co/cvrPXL6/bokaal2.jpg",
  "https://i.ibb.co/CMNYL2k/92449ba604a5c01f3adc696f1dbb1fdd.jpg",
  "https://i.ibb.co/y8Kg2v9/1280px-Bar-P1030319.jpg",
  "https://i.ibb.co/R7wJ3SF/09aa053e522cc9a55786c19cb14ed1a66e6ad418.jpg",
  "https://i.ibb.co/TgXxz5Y/73aa46fa721fd4274d8aca444af8ac88.jpg",
  "https://i.ibb.co/TgXxz5Y/73aa46fa721fd4274d8aca444af8ac88.jpg" 
  ]; 

  return (
    <div id="list-container">
      <div className="corner-logo-container">
        <img className="corner-logo" alt="spacehop-logo" src={logo}></img>
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
              history.push(`/booking/${biz.name}`, {state: biz});
            }}
            key={biz.name + biz.id}
          >

            {/* handle business image */}
            <img 
            className="business-image"
            alt = "izakaya"
            src = { 
              biz.id===1 && bizImg[0] || 
              biz.id===2 && bizImg[1] ||
              biz.id===3 && bizImg[2] ||
              biz.id===4 && bizImg[3] ||
              biz.id===5 && bizImg[4] ||
              biz.id===6 && bizImg[5] ||
              biz.id===7 && bizImg[6] ||
              biz.id===8 && bizImg[7] ||
              biz.id===9 && bizImg[8] ||
              biz.di===10 && bizImg[9]
            }
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
      <Map bizImgPic={bizImg}/>


      <div id="mobile-location-container">
        <Slider dots={true} slidesToShow={1} swipe={true}>
          {/* Mapping through businesses to display each bizcard */}
          {businesses.map((biz) => (
            <div
              className="location-cell"
              onClick={() => {
                history.push(`/booking/${biz.name}`, { state: biz });
              }}
              key={biz.name +  biz.id}
            >
            {/* handle business image */}
            <img 
            className="business-image"
            alt = "izakaya"
            src = { 
              biz.id===1 && bizImg[0] || 
              biz.id===2 && bizImg[1] ||
              biz.id===3 && bizImg[2] ||
              biz.id===4 && bizImg[3] ||
              biz.id===5 && bizImg[4] ||
              biz.id===6 && bizImg[5] ||
              biz.id===7 && bizImg[6] ||
              biz.id===8 && bizImg[7] ||
              biz.id===9 && bizImg[8] ||
              biz.di===10 && bizImg[9]
            }
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
