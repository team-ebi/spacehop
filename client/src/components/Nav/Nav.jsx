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

export default function Nav() {
  const [displayMenu, setDisplayMenu] = useState(false);
  const [displayLogin, setDisplayLogin] = useState(false);
  const [dimOverlay, setDimOverlay] = useState("");

  // when user clicks login button, menu window will disappear
  // and login window will appear
  function handleLoginClick() {
    setDisplayMenu(false);
    setDisplayLogin(true);
    setDimOverlay("dim");
  }

  // when user clicks on body, login and menu windows will close
  function clearDisplay() {
    setDisplayLogin(false);
    setDisplayMenu(false);
    setDimOverlay("");
  }

  return (
    <>
      <div className={`overlay ${dimOverlay}`} onClick={clearDisplay}></div>
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
            <div className="menu-item">
              <AmplifySignOut buttonText="Log out" />
            </div>
          </div>
        )}

        {displayLogin && (
          <div id="login-window">
            <AmplifyAuthenticator>
              <AmplifySignUp
                slot="sign-up"
                usernameAlias="email"
                formFields={[
                  {
                    type: "first_name",
                    label: "First Name",
                    required: true,
                  },
                  {
                    type: "last_name",
                    label: "Last Name",
                    required: true,
                  },
                  {
                    type: "email",
                    label: "Email",
                    required: true,
                  },
                  {
                    type: "phone",
                    label: "Phone",
                    required: true,
                  },
                ]}
              />
              <AmplifySignIn slot="sign-in" usernameAlias="email" />
            </AmplifyAuthenticator>
          </div>
        )}
      </nav>
    </>
  );
}
