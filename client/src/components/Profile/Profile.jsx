import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../useContext/UserContext";
import { Button, Container, Row, Col, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import FutureBookings from "../BookingsAll/BookingsAll";
import { Auth } from "aws-amplify";
import "./Profile.css";
import axios from "axios"; 

function Profile() {
  const { user } = useContext(UserContext);
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [displayInputs, setDisplayInputs] = useState(false);


    useEffect(() => {
        async function fetchUser(){
          if(user){
            let req = axios.get(`http://localhost:4000/api/users/${user.attributes.email}`)      
            let res = await req; 
            let data = res.data;  
            setGivenName(data[0].first_name);
            setFamilyName(data[0].last_name); 
            setEmail(data[0].email);
            setPhone(data[0].phone); 
          }
      }
      fetchUser(); 
  },[user]);

    // this function should pull from component state and
    // post to db + update user pool
    async function updateProfile() {
      axios.patch(`http://localhost:4000/api/users/`, 
      {
        "first_name":givenName, 
        "last_name":familyName,
        "email":email,
        "phone":phone
      }); 


      //profile page is updated exept email. 
      //email shouldn't be changed 
      user.attributes.given_name=givenName; 
      user.attributes.family_name=familyName;
      user.attributes.phone_number=phone; 

      setDisplayInputs(false); 
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
        <main id="main">
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
                    {user && givenName}
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
                    {user && familyName}
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
                    {user && email}
                  </div>
                )}
                {displayInputs && (
                  <div className="attribute">
                    {/* <input
                      className="profile-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    /> */}
                    {user && email}
                  </div>
                )}
              </div>
              <div className="detail">
                <div id="profile-categories">Phone Number: </div>
                {!displayInputs && (
                  <div className="attribute">
                    {user && phone}
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
