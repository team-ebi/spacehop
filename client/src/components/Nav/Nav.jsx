import React, { useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Auth } from "aws-amplify";
import {
  AmplifySignIn,
  AmplifyAuthenticator,
  AmplifySignOut,
  AmplifySignUp,
} from "@aws-amplify/ui-react";
import "./Nav.css";

export default function Nav({}) {
  const [displayMenu, setDisplayMenu] = useState(false);
  const [displayLogin, setDisplayLogin] = useState(false);
  const [dimOverlay, setDimOverlay] = useState("");
  const [displaySignup, setDisplaySignup] = useState(false);

  // when user clicks login button, menu window will disappear
  // and login window will appear
  function handleLoginClick() {
    setDisplayMenu(false);
    setDisplayLogin(true);
    setDisplaySignup(false);
    setDimOverlay("dim");
  }

  // when user clicks signup button, menu window will disappear
  // and login window will appear
  function handleSignupClick() {
    setDisplayMenu(false);
    setDisplaySignup(true);
    setDisplayLogin(false);
    setDimOverlay("dim");
  }

  // when user clicks on body, login and menu windows will close
  function clearDisplay() {
    setDisplayLogin(false);
    setDisplayMenu(false);
    setDisplaySignup(false);
    setDimOverlay("");
  }

  const history = useHistory();

  function teamHandler() {
    return history.push("/team");
  }

  function aboutHandler() {
    return history.push("/about");
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
            <button className="menu-item" onClick={handleSignupClick}>
              Sign Up
            </button>
            <button className="menu-item">Profile</button>
            <button className="menu-item" onClick={aboutHandler}>
              About
            </button>
            <button className="menu-item" onClick={teamHandler}>
              Team
            </button>
            <div className="menu-item">
              <AmplifySignOut buttonText="Log out" />
            </div>
          </div>
        )}

        {displayLogin && (
          <div className="auth-window">
            <AmplifyAuthenticator>
              <AmplifySignIn slot="sign-in" usernameAlias="email" />
            </AmplifyAuthenticator>
          </div>
        )}

        {displaySignup && (
          <div className="auth-window">
            <AmplifyAuthenticator initialAuthState="signup">
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
            </AmplifyAuthenticator>
          </div>
        )}
      </nav>
    </>
  );
}
