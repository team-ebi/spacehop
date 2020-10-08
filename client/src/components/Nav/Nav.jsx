import React, { useState } from "react";
import "./Nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUserCircle } from "@fortawesome/free-solid-svg-icons";

export default function Nav() {
  const [displayMenu, setDisplayMenu] = useState(false);

  return (
    <nav>
      <div id="navbar">
        <div id="menu-container" onClick={() => setDisplayMenu(!displayMenu)}>
          
          {/* when button is clicked, small menu window will pop up */}
          <div id="menu-button">
            <FontAwesomeIcon icon={faBars} size="lg" color="#80CC37" />
          </div>
          <div id="profile-thumb">
            <FontAwesomeIcon icon={faUserCircle} size="lg" color="#80CC37" />
          </div>
        </div>
      </div>

      {/* menu when user is not logged in yet */}
      {displayMenu && 
      <div id="menu">
        <div className="menu-item" id="login">Log In</div>
        <div className="menu-item">Sign Up</div>
        <div className="menu-item">Profile</div>
        <div className="menu-item">About</div>
        <div className="menu-item">Team</div>
      </div>}
    </nav>
  );
}
