import React, { useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import "./Nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUserCircle } from "@fortawesome/free-solid-svg-icons";

export default function Nav({}) {
  const [displayMenu, setDisplayMenu] = useState(false);
  const history = useHistory();


  function teamHandler() {
    return history.push("/team");
  }

  function aboutHandler() {
    return history.push("/about");
  }

  function profileHandler() {
    return history.push("/profile");
  }

  return (
    <nav>
      <div id="navbar">
        <div id="menu-container" onClick={() => setDisplayMenu(!displayMenu)}>
          {/* when button is clicked, small menu window will pop up */}
          <div id="menu-button">
            <FontAwesomeIcon icon={faBars} size="lg" color="#80CC37" />
          </div>
          <div id="profile-thumb" onClick={profileHandler}>
            <FontAwesomeIcon icon={faUserCircle} size="lg" color="#80CC37" />
          </div>
        </div>
      </div>

      {/* menu when user is not logged in yet */}
      {displayMenu && (
        <div id="menu">
          <div
            className="menu-item"
            id="login"
          >
            Log In
          </div>
          <div className="menu-item">Sign Up</div>
          <div className="menu-item" onClick={profileHandler}>Profile</div>
          <div className="menu-item" onClick={aboutHandler}>
            About
          </div>
          <div className="menu-item" onClick={teamHandler}>
            Team
          </div>
        </div>
      )}
    </nav>
  );
}
