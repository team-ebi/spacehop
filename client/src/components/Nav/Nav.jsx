import React, { useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBars,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Auth } from "aws-amplify";
import {
  AmplifySignIn,
  AmplifyAuthenticator,
  AmplifySignOut,
  AmplifySignUp,
} from "@aws-amplify/ui-react";
import "./Nav.css";

export default function Nav({}) {
  // these states manage display for modal windows for menu, login, and signup
  const [displayMenu, setDisplayMenu] = useState(false);
  const [displayLogin, setDisplayLogin] = useState(false);
  const [displaySignup, setDisplaySignup] = useState(false);
  const [dimOverlay, setDimOverlay] = useState("");

  // when user clicks login button, menu window will disappear
  // and login window will appear with overlay
  function handleLoginClick() {
    setDisplayMenu(false);
    setDisplayLogin(true);
    setDisplaySignup(false);
    setDimOverlay("dim");
  }

  // when user clicks signup button, menu window will disappear
  // and login window will appear with overlay
  function handleSignupClick() {
    setDisplayMenu(false);
    setDisplaySignup(true);
    setDisplayLogin(false);
    setDimOverlay("dim");
  }

  // when user clicks outside of modal window, modal window and overlay will disappear
  function clearDisplay() {
    setDisplayLogin(false);
    setDisplayMenu(false);
    setDisplaySignup(false);
    setDimOverlay("hide");
  }

  // initializing react router
  const history = useHistory();

  // redirects to to 'team' page with react router
  // will close menu window
  function teamHandler() {
    setDisplayMenu(false);
    return history.push("/team");
  }

  // redirects to to 'about' page with react router
  // will close menu window
  function aboutHandler() {
    setDisplayMenu(false);
    return history.push("/about");
  }

  // redirects to to 'home' page with react router
  // will close menu window if it's open
  function homeHandler() {
    setDisplayMenu(false);
    return history.push("/");
  }

  return (
    <>
      {/* this overlay is hidden unless signin/signup modal windows are open */}
      <div className={`overlay ${dimOverlay}`} onClick={clearDisplay}></div>

      <nav>
        <div id="navbar">
          <div id="home-button">
            <FontAwesomeIcon
              icon={faHome}
              size="lg"
              color="#80CC37"
              onClick={homeHandler}
            />
          </div>
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

        {/* signin form will be displayed when user clicks on
        "Log in" button from menu window*/}
        {displayLogin && (
          <div className="auth-window">
            <AmplifyAuthenticator>
              <AmplifySignIn slot="sign-in" usernameAlias="email" />
            </AmplifyAuthenticator>
          </div>
        )}

        {/* signup form will be displayed when user clicks on
        "Sign up" button from menu window */}
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
