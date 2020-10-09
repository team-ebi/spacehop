import React, { useState, useContext } from "react";
import { UserContext } from "../useContext/UserContext";
import Auth from "../Auth/Auth";
import { useHistory } from "react-router-dom";
import { BusinessContext } from "../useContext/BusinessContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBars,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import "./Nav.css";

export default function Nav() {
  // these states manage display for modal windows for menu, login, and signup
  const [displayMenu, setDisplayMenu] = useState(false);
  const [displayLogin, setDisplayLogin] = useState(false);
  const [displaySignup, setDisplaySignup] = useState(false);
  const [dimOverlay, setDimOverlay] = useState("hide");
  const { user, setUser } = useContext(UserContext);

  // when user clicks login button, menu window will disappear
  // and login window will appear with overlay
  function loginHandler() {
    setDisplayMenu(false);
    setDisplayLogin(true);
    setDisplaySignup(false);
    setDimOverlay("dim");
  }

  // when user clicks signup button, menu window will disappear
  // and login window will appear with overlay
  function signupHandler() {
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

  // redirects to to 'home' page with react router
  // will close menu window if it's open
  function homeHandler() {
    setDisplayMenu(false);
    return history.push("/");
  }

  // redirects to to 'about' page with react router
  // will close menu window
  function aboutHandler() {
    setDisplayMenu(false);
    return history.push("/about");
  }

  // redirects to to 'team' page with react router
  // will close menu window
  function teamHandler() {
    setDisplayMenu(false);
    return history.push("/team");
  }

  // redirects to to 'profile' page with react router
  // will close menu window if it's open
  function profileHandler() {
    setDisplayMenu(false);
    return history.push("/profile");
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
          <div id="welcome">
            <h2>{`Welcome${
              user ? ", " + user.attributes.given_name : ""
            }!`}</h2>
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
            {!user && (
              <button className="menu-item" id="login" onClick={loginHandler}>
                Log in
              </button>
            )}
            {!user && (
              <button className="menu-item" onClick={signupHandler}>
                Sign Up
              </button>
            )}
            {user && (
              <button className="menu-item" onClick={profileHandler}>
                Profile
              </button>
            )}
            <button className="menu-item" onClick={aboutHandler}>
              About
            </button>
            <button className="menu-item" onClick={teamHandler}>
              Team
            </button>
            {user && (
              <div className="menu-item">
                <AmplifySignOut buttonText="Log out" />
              </div>
            )}
          </div>
        )}

        {(displayLogin || displaySignup) && (
          <Auth login={displayLogin} signup={displaySignup} />
        )}
      </nav>
    </>
  );
}
