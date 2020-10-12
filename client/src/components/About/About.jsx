import React from "react";
import "./About.css";
import logo from "../../images/logo.png";

export default function About() {
  return (
    <div id="about-container">
      <div className="corner-logo-container">
        <img className="corner-logo" src={logo}></img>
      </div>
      <header>
        <h1>about</h1>
      </header>
    </div>
  );
}
