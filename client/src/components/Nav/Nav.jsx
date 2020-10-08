import React, { useState } from "react";
import "./Nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Auth } from "aws-amplify";
import {
  AmplifySignIn,
  AmplifyAuthenticator,
  AmplifySignOut,
  AmplifySignUp,
} from "@aws-amplify/ui-react";
import logo from "../../images/logo.png";

export default function Nav() {
  const [displayMenu, setDisplayMenu] = useState(false);
  const [displayLogin, setDisplayLogin] = useState(false);

  function handleLoginClick() {
    setDisplayMenu(false);
    setDisplayLogin(true);
  }

  function clearDisplay() {
    setDisplayLogin(false);
    setDisplayMenu(false);
  }
  

  return (
    <>
      <div
        className="overlay"
        onClick={clearDisplay}
      ></div>
      <nav>
        <div id="navbar">
          <div id="menu-container" onClick={() => setDisplayMenu(true)}>
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
        {displayMenu && (
          <div id="menu">
            <button className="menu-item" id="login" onClick={handleLoginClick}>
              Log in
            </button>
            <div className="menu-item">Sign Up</div>
            <div className="menu-item">Profile</div>
            <div className="menu-item">About</div>
            <div className="menu-item">Team</div>
            <AmplifySignOut />
          </div>
        )}

        {displayLogin && (
          <div id="login-window">
            <AmplifySignIn usernameAlias="email" />
          </div>
        )}
      </nav>
    </>
  );
}
