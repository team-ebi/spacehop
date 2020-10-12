import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../useContext/UserContext";
import { Button, Container, Row, Col, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import FutureBookings from "../FutureBookings/FutureBookings";
import { Auth } from "aws-amplify";
import "./Profile.css";

function Profile() {
  const { user } = useContext(UserContext);
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();
  const [displayInputs, setDisplayInputs] = useState(false);

  useEffect(() => {
    if (user) {
      setGivenName(user.attributes.given_name);
      setFamilyName(user.attributes.family_name);
      setEmail(user.attributes.email);
      setPhone(user.attributes.phone_number);
    }
  }, [user]);

  // this function should pull from component state and
  // post to db + update user pool
  async function updateProfile() {
   
  }

  return (
    <div id="user-profile-container">
      <h2
        style={{
          padding: "20px 10px",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Profile
      </h2>
      <div id="section-container">
        <main>
          <div id="profile-info">
            <div id="profile-img">
              <FontAwesomeIcon
                icon={faUserCircle}
                size="8x"
                color="darkslategrey"
              />
            </div>
            <div id="profile-details">
              <div className="detail">
                <div id="profile-categories">First Name: </div>
                {!displayInputs && (
                  <div className="attribute">
                    {user && user.attributes.given_name}
                  </div>
                )}
                {displayInputs && (
                  <div className="attribute">
                    <input
                      className="profile-input"
                      value={givenName}
                      onChange={(e) => setGivenName(e.target.value)}
                    />
                  </div>
                )}
              </div>
              <div className="detail">
                <div id="profile-categories">Last Name: </div>
                {!displayInputs && (
                  <div className="attribute">
                    {user && user.attributes.family_name}
                  </div>
                )}
                {displayInputs && (
                  <div className="attribute">
                    <input
                      className="profile-input"
                      value={familyName}
                      onChange={(e) => setFamilyName(e.target.value)}
                    />
                  </div>
                )}
              </div>
              <div className="detail">
                <div id="profile-categories">Email: </div>
                {!displayInputs && (
                  <div className="attribute">
                    {user && user.attributes.email}
                  </div>
                )}
                {displayInputs && (
                  <div className="attribute">
                    <input
                      className="profile-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                )}
              </div>
              <div className="detail">
                <div id="profile-categories">Phone Number: </div>
                {!displayInputs && (
                  <div className="attribute">
                    {user && user.attributes.phone_number}
                  </div>
                )}
                {displayInputs && (
                  <div className="attribute">
                    <input
                      className="profile-input"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div id="edit-button-container">
            {/* this button will display only if user is not in editing mode */}
            {!displayInputs && (
              <button
                id="edit-button"
                onClick={() => setDisplayInputs(!displayInputs)}
              >
                Edit
              </button>
            )}

            {/* this button will display only if user is editing details
        when clicked, it should post new details to user pool and db */}
            {displayInputs && (
              <button id="edit-button" onClick={updateProfile}>
                Save
              </button>
            )}
          </div>
          {displayInputs && (
            <div id="edit-button-container">
              <button id="cancel" onClick={() => setDisplayInputs(false)}>
                Cancel
              </button>
            </div>
          )}
        </main>
        <hr id="profile-divider"></hr>
        <section>
          <FutureBookings />
        </section>
      </div>

      {/* future bookings is set in the middle of this code */}
      {/* future booking has its own branch : futureBookings */}
    </div>
  );
}

export default Profile;
