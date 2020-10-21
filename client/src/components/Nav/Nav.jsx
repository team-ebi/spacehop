import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../useContext/UserContext";
import { AuthStateContext } from "../useContext/AuthStateContext";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSearch,
  faBars,
  faUserCircle,
  faBuilding,
  faUsers,
  faFrog,
  faSignOutAlt,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import Auth from "../Auth/Auth";
import { Auth as AuthUser } from "aws-amplify";
import "./Nav.css";
//miku
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss'; 

export default function Nav() {
  // these states manage display for modal windows for menu, login, and signup
  const [displayMenu, setDisplayMenu] = useState(false);
  const [displayMobileMenu, setDisplayMobileMenu] = useState("hideMenu");
  const [displayLogin, setDisplayLogin] = useState(true);
  const [displaySignup, setDisplaySignup] = useState(false);
  const [dimOverlay, setDimOverlay] = useState("hide");
  const { user, setUser } = useContext(UserContext);
  const { setAuthState } = useContext(AuthStateContext);

  // once user logs and verifies email,
  // this will remove overlay and close modals
  useEffect(() => {
    if (user && user.attributes) {
      setDisplayLogin(false);
      setDisplaySignup(false);
      setDimOverlay("hide");
    }
  }, [user]);

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

  // initializing react router's useHistory hook
  const history = useHistory();

  // redirects to 'home' page with react router
  // will close menu window if it's open
  function homeHandler() {
    setDisplayMenu(false);
    return history.push("/");
  }

  // redirects to 'about' page with react router
  // will close menu window
  function aboutHandler() {
    setDisplayMenu(false);
    return history.push("/about");
  }

  // redirects to 'team' page with react router
  // will close menu window
  function teamHandler() {
    setDisplayMenu(false);
    return history.push("/team");
  }

  // redirects to 'profile' page with react router
  // will close menu window if it's open
  function profileHandler() {
    setDisplayMenu(false);
    return history.push("/profile");
  }

  // redirects to 'profile' page with react router
  // will close menu window if it's open
  function businessHandler() {
    setDisplayMenu(false);
    return history.push("/business");
  }

  // redirects to 'messages' page with react router
  // will close menu window if it's open
  function messageHandler() {
    setDisplayMenu(false);
    return history.push("/inbox");
  }

  async function signoutHandler() {
    await AuthUser.signOut();
    setAuthState(null);
    setUser(null);
    return history.push("/");
  }

  return (
    <>
      {/* this overlay is hidden unless signin/signup modal windows are open */}
      <div className={`overlay ${dimOverlay}`} onClick={clearDisplay}></div>

      <nav>
        <div id="navbar">
          {/* home button will go to main page */}
          <div id="home-button">
            <FontAwesomeIcon
              icon={faHome}
              size="lg"
              color="#80CC37"
              onClick={homeHandler}
            />
          </div>
          <div id="welcome">
            {/* if user is logged in, will greet by name */}
            <h2>{`Welcome${
              user && user.attributes ? ", " + user.attributes.given_name : ""
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

          <div id="mobile-bar">
            <button className="menu-item" onClick={homeHandler}>
              <div>
                <FontAwesomeIcon icon={faSearch} size="lg" color="#80CC37" />
              </div>
              <div className="nav-label">Search</div>
            </button>
            {/* only display login button if user is NOT logged in */}
            {!user && (
              <button className="menu-item" id="login" onClick={loginHandler}>
                <div>
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    size="lg"
                    color="#80CC37"
                  />
                </div>
                <div className="nav-label">Log in</div>
              </button>
            )}

            {/* only display profile button if user IS logged in */}
            {user && user.attributes && (
              <button className="menu-item" onClick={profileHandler}>
                <div>
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    size="lg"
                    color="#80CC37"
                  />
                </div>
                <div className="nav-label"> Profile</div>
              </button>
            )}
            {/* <button className="menu-item" onClick={aboutHandler}>
              About
            </button> */}

            {/* only display message button if user IS logged in */}
            {user && user.attributes && (
              <button className="menu-item" onClick={messageHandler}>
                <div>
                  <FontAwesomeIcon icon={faComment} size="lg" color="#80CC37" />
                </div>
                <div className="nav-label">Inbox</div>
              </button>
            )}

            {/* only display profile button if user IS logged in */}
            {user && user.attributes && (
              <button
                className="menu-item"
                onClick={() =>
                  displayMobileMenu === "hideMenu"
                    ? setDisplayMobileMenu("show")
                    : setDisplayMobileMenu("hideMenu")
                }
              >
                <div>
                  <FontAwesomeIcon icon={faBars} size="lg" color="#80CC37" />
                </div>
                <div className="nav-label">Menu</div>
              </button>
            )}
          </div>
        </div>

        <div
          id="mobile-menu"
          className={displayMobileMenu}
          onClick={() => setDisplayMobileMenu("hideMenu")}
        >
          {/* only display profile button if user IS logged in */}
          {user && user.attributes && (
            <button className="mobile-menu-item" onClick={businessHandler}>
              <FontAwesomeIcon icon={faBuilding} size="lg" color="#80CC37" />
              <span className="mobile-menu-text">Business Profile</span>
            </button>
          )}

          <button className="mobile-menu-item" onClick={aboutHandler}>
            <FontAwesomeIcon icon={faFrog} size="lg" color="#80CC37" />
            <span className="mobile-menu-text">About</span>
          </button>

          <button className="mobile-menu-item" onClick={teamHandler}>
            <FontAwesomeIcon icon={faUsers} size="lg" color="#80CC37" />
            <span className="mobile-menu-text">Team</span>
          </button>

          {/* only display signout button if user IS logged in */}
          {user && user.attributes && (
            <button className="mobile-menu-item" onClick={signoutHandler}>
              <FontAwesomeIcon icon={faSignOutAlt} size="lg" color="#80CC37" />
              <span className="mobile-menu-text">Log out</span>
            </button>
          )}
        </div>

        {/* menu when user is not logged in yet */}
        {displayMenu && (
          <div id="menu">
            {/* only display login button if user is NOT logged in */}
            {!user && (
              <button className="menu-item" id="login" onClick={loginHandler}>
                Log in
              </button>
            )}

            {/* only display signup button if user is NOT logged in */}
            {!user && (
              <button className="menu-item" onClick={signupHandler}>
                Sign Up
              </button>
            )}

            {/* miku */}
            {/* only display profile button if user IS logged in */}
            <Swiper>
            {user && user.attributes && (
              <SwiperSlide>
              {/* <button className="menu-item" onClick={profileHandler}>
                Profile
              </button> */}
              <button className="menu-item" onClick={profileHandler}>
                Profile
              </button>

              </SwiperSlide>
            )}

           {/* only display message button if user IS logged in */}
           {user && user.attributes && (
              <button className="menu-item" onClick={messageHandler}>
                Inbox
              </button>
            )}

            {/* only display profile button if user IS logged in */}
            {user && user.attributes && (
              <button className="menu-item" onClick={businessHandler}>
                Business Page
              </button>
            )}

            <button className="menu-item" onClick={aboutHandler}>
              About
            </button>

            <button className="menu-item" onClick={teamHandler}>
              Team
            </button>

            {/* only display signout button if user IS logged in */}
            {user && user.attributes && (
              <button className="menu-item" onClick={signoutHandler}>
                Log out
              </button>
              // <div className="menu-item">
              //   <AmplifySignOut buttonText="Log out" />
              // </div>
            )}

            </Swiper>
          </div>
        )}

        {/* if user clicks login or signup, Auth component will render.
        pass props to determine which form gets rendered in Auth */}
        {(displayLogin || displaySignup) && (
          <Auth login={displayLogin} signup={displaySignup} />
        )}
      </nav>
    </>
  );
}
