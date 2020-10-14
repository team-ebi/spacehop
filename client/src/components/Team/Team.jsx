import React from "react";
import "./Team.css";
import nori from "../../images/nori.png";
import miku from "../../images/miku.png";
import tanner from "../../images/tanner.png";
import yusuke from "../../images/yusuke.png";
import cat from "../../images/cat.png";
import hopper from "../../images/hopper.png";
import logo from "../../images/logo.png";

export default function Team() {
  return (
    <div id="team-container">
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
