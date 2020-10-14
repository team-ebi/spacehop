import React from "react";
import Team from "../Team/Team";
import "./About.css";
import logo from "../../images/logo.png";
import OurProduct from "../OurProduct/OurProduct";

export default function About() {
  return (
    <div id="about-container">
      <div className="corner-logo-container">
        <img className="corner-logo" alt="spacehop-logo" src={logo}></img>
      </div>
      <OurProduct/>
      <Team/>
    </div>
  );
}
