import React from "react";
import { useHistory } from "react-router-dom";
import "./About.css";
import cornerLogo from "../../images/spacehop-name.png";
import imgPic from "../../images/file-20200624-132988-168jsqs (2).jpg";
import frogPic from "../../images/s512_choju45_0009_0.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";

export default function About() {
  // initializing react router's useHistory hook
  const history = useHistory();
  function goBack() {
    return history.goBack();
  }

  return (
    <div id="about-container">
      <div className="back-icon" onClick={goBack}>
        <FontAwesomeIcon
          icon={faArrowCircleLeft}
          size="lg"
          color="darkslategrey"
        />
        <span className="back-text">Back</span>
      </div>
      <div className="corner-logo-container">
        <img
          className="corner-logo web"
          alt="spacehop-logo"
          src={cornerLogo}
        ></img>
      </div>
      <div id="OurProduct-container">
        <header>
          <h1>about</h1>
        </header>
        <div id="about-opener">
          <div id="subheader">
            <h4>
              Tired of working remotely in your <br></br>
              tiny Tokyo apartment?
            </h4>
            <h4>
              Or perhaps you're a small business <br></br>
              owner looking for creative ways to keep the lights on?
            </h4>
          </div>
          <img id="cafe" src={imgPic} alt="cafe" />
        </div>
        <div className="textField">
          <p>
            Spacehop is our team's vision for a mobile-friendly web app that
            seeks to help two types of users in today's pandemic-impacted
            society:
          </p>
          <p>
            1. Small businesses that have suffered a loss in business due to the
            pandemic and have under-utilized spaces that can be rented out for
            alternative use.
          </p>
          <p>
            2. Workers who are now required to work remotely but want to get out
            of their house from time to time
          </p>

          <p>
            With Spacehop, remote workers can conveniently search for places to
            work from for the day. These spaces can range from izakayas, concert
            venues, exercise studios, and more!
          </p>
          <p>
            The pandemic may not last forever, but remote work will be here to
            stay.
          </p>
          <div className="lastLine-container">
            <p id="lastLine">Spacehop can help!</p>
            <img id="frog" src={frogPic} alt="frog" />
          </div>
        </div>
      </div>
    </div>
  );
}
