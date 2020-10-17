import React from "react";
import Team from "../Team/Team";
import "./About.css";
import cornerLogo from "../../images/spacehop-name.png";
import OurProduct from "../OurProduct/OurProduct";

export default function About() {
  return (
    <div id="about-container">
      <div className="corner-logo-container">
        <img
          className="corner-logo web"
          alt="spacehop-logo"
          src={cornerLogo}
        ></img>
      </div>
      <OurProduct />
      <Team />
    </div>
  );
}
