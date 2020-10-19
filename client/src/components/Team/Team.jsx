import React from "react";
import { useHistory } from "react-router-dom";
import "./Team.css";
import cornerLogo from "../../images/spacehop-name.png";
import nori from "../../images/nori.png";
import miku from "../../images/miku.png";
import tanner from "../../images/tanner.png";
import yusuke from "../../images/yusuke.png";
import cat from "../../images/cat.png";
import hopper from "../../images/hopper.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";

export default function Team() {
  // initializing react router's useHistory hook
  const history = useHistory();
  function goBack() {
    return history.goBack();
  }

  return (
    <div id="team-container">
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
      <header>
        <h1>meet the team</h1>
      </header>

      <div id="team">
        <div className="teammate">
          <a
            href="https://github.com/noritaketakamichi"
            className="clickable"
            target="blank"
          >
            <img className="member" src={nori} alt="nori" />
          </a>
          <div className="name">Nori</div>
          <div className="description">Fullstack</div>
          <div className="description">Tech Lead</div>
        </div>

        <div className="teammate">
          <a
            href="https://github.com/miku0129"
            className="clickable"
            target="blank"
          >
            <img className="member" src={miku} alt="miku" />
          </a>
          <div className="name">Miku</div>
          <div className="description">Frontend</div>
        </div>

        <div className="teammate">
          <a
            href="https://github.com/thaberl13"
            className="clickable"
            target="blank"
          >
            <img className="member" src={tanner} alt="tanner" />
          </a>
          <div className="name">Tanner</div>
          <div className="description">Fullstack</div>
        </div>

        <div className="teammate">
          <a
            href="https://github.com/yusuke99"
            className="clickable"
            target="blank"
          >
            <img className="member" src={yusuke} alt="yusuke" />
          </a>
          <div className="name">Yusuke</div>
          <div className="description">Backend</div>
        </div>

        <div className="teammate">
          <a
            href="https://github.com/catboop"
            className="clickable"
            target="blank"
          >
            <img className="member" src={cat} alt="cat" />
          </a>
          <div className="name">Cat</div>
          <div className="description">Fullstack</div>
        </div>

        <div className="teammate">
          <a
            href="https://github.com/team-ebi/spacehop"
            className="clickable"
            target="blank"
          >
            <img className="member" src={hopper} alt="mascot" />
          </a>
          <div className="name">Hopper</div>
          <div className="description">Shortstack</div>
        </div>
      </div>
    </div>
  );
}
