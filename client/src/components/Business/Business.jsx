import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../useContext/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import BookingsAll from "../BookingsAll/BookingsAll";
import axios from "axios";
import "./Business.css";

function Business() {
  // user email used to fetch data from db
  const { user } = useContext(UserContext);

  // if user already has business, get req will update this state
  // and display business details on business profile
  const [userBusiness, setUserBusiness] = useState(null);

  // state will be updated when user enters inputs
  const [businessName, setBusinessName] = useState("");
  const [addressStreet, setAddressStreet] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressZip, setAddressZip] = useState("");
  const [phone, setPhone] = useState("");
  const [bizType, setBizType] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [price, setPrice] = useState(0);

  // will either display user's biz profile or a form to register business
  const [displayBizPage, setDisplayBizPage] = useState(false);
  const [displayInputs, setDisplayInputs] = useState(false);

  // will connect to aws or default to loalhost
  const baseUrl = process.env.BACKEND_URL || "http://localhost:4000";

  // fetch user's business
  // BACKEND ENDPOINT IN PROGRESS
  useEffect(() => {
    async function fetchUserBiz() {
      // check if user is logged in
      if (user) {
        // check to see if user has a business associated with their account
        // if so, set userBusiness to their business
        const res = await axios.get(`/api/businesses/${user.attributes.email}`);
        if (res.data.length > 0) {
          setUserBusiness(res.data);
          setDisplayBizPage(true);
          setBusinessName(res.data.name);
          setAddressStreet(res.data.address_street);
          setAddressCity(res.data.address_city);
          setAddressZip(res.data.address_zip);
          setPhone(res.data.phone);
          setBizType(res.data.business_type);
          setCapacity(res.data.capacity);
          setPrice(res.data.price);
        }
      }
    }
    fetchUserBiz();
  }, []);

  

  // NEEDS TO BE WRITTEN
  // if the user adds their business,
  // this function should pull from component state and
  // patch to db
  async function updateBizTable() {
    try {
      await axios.post(`${baseUrl}/api/businesses/`, {
        email: user.attributes.email,
        name: businessName,
        address_street: addressStreet,
        address_city: addressCity,
        address_zip: addressZip,
        phone: phone,
        business_type: bizType,
        capacity: capacity,
        price: price,
      });
    } catch (err) {
      alert("There was an error with your request. Please try again later!");
    }
  }

  // when user clicks to add a new business,
  // the inputs will be displayed
  // but the profile info will be hidden
  function addBiz() {
    setDisplayInputs(true);
    setDisplayBizPage(false);
  }

  return (
    <div id="biz-profile-container">
      {/* this is the header */}
      <h2
        style={{
          padding: "20px 10px",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Business Page
      </h2>

      {/* if the user doesn't have a business, then the button
      to add a business will be displayed */}
      {!userBusiness && (
        <div id="add-biz-container">
          <button
            id="add-button"
            className="edit-button"
            // if the user clicks to add a business, then the
            // biz registration form will be displayed
            onClick={addBiz}
          >
            Add your business.
          </button>
        </div>
      )}

      {(displayInputs || userBusiness) && (
        <div id="section-container">
          <main>
            <div id="profile-info">
              {/* this is a generic user image, but we can also change to something else */}
              <div id="biz-img">
                <FontAwesomeIcon
                  icon={faUserCircle}
                  size="8x"
                  color="darkslategrey"
                />
              </div>
              <div id="biz-details">
                {/* user has a profile, displayInputs is false */}
                <div className="detail">
                  <div id="profile-categories">Business Name: </div>
                  {!displayInputs && (
                    <div className="attribute">
                      {userBusiness && userBusiness.name}
                    </div>
                  )}

                  {/* user does not have profile => this is an input form */}
                  {displayInputs && (
                    <div className="attribute">
                      <input
                        className="profile-input"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                      />
                    </div>
                  )}
                </div>

                {/* user has a profile, displayInputs is false */}
                <div className="detail">
                  <div id="profile-categories">Street Address: </div>
                  {!displayInputs && (
                    <div className="attribute">
                      {userBusiness && userBusiness.address_street}
                    </div>
                  )}
                  {displayInputs && (
                    <div className="attribute">
                      <input
                        className="profile-input"
                        value={addressStreet}
                        onChange={(e) => setAddressStreet(e.target.value)}
                      />
                    </div>
                  )}
                </div>

                {/* user has a profile, displayInputs is false */}
                <div className="detail">
                  <div id="profile-categories">City: </div>
                  {!displayInputs && (
                    <div className="attribute">
                      {userBusiness && userBusiness.address_city}
                    </div>
                  )}
                  {displayInputs && (
                    <div className="attribute">
                      <input
                        className="profile-input"
                        value={addressCity}
                        onChange={(e) => setAddressCity(e.target.value)}
                      />
                    </div>
                  )}
                </div>

                {/* user has a profile, displayInputs is false */}
                <div className="detail">
                  <div id="profile-categories">Zip Code: </div>
                  {!displayInputs && (
                    <div className="attribute">
                      {userBusiness && userBusiness.address_zip}
                    </div>
                  )}
                  {displayInputs && (
                    <div className="attribute">
                      <input
                        className="profile-input"
                        value={addressZip}
                        onChange={(e) => setAddressZip(e.target.value)}
                      />
                    </div>
                  )}
                </div>

                {/* user has a profile, displayInputs is false */}
                <div className="detail">
                  <div id="profile-categories">Business Phone: </div>
                  {!displayInputs && (
                    <div className="attribute">
                      {userBusiness && userBusiness.phone}
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

                {/* user has a profile, displayInputs is false */}
                <div className="detail">
                  <div id="profile-categories">Business Type: </div>
                  {!displayInputs && (
                    <div className="attribute">
                      {userBusiness && userBusiness.business_type}
                    </div>
                  )}
                  {displayInputs && (
                    <div className="attribute">
                      <input
                        className="profile-input"
                        value={bizType}
                        onChange={(e) => setBizType(e.target.value)}
                      />
                    </div>
                  )}
                </div>

                {/* user has a profile, displayInputs is false */}
                <div className="detail">
                  <div id="profile-categories">Capacity: </div>
                  {!displayInputs && (
                    <div className="attribute">
                      {userBusiness && userBusiness.capacity}
                    </div>
                  )}
                  {displayInputs && (
                    <div className="attribute">
                      <input
                        type="number"
                        className="profile-input"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                      />
                    </div>
                  )}
                </div>

                {/* user has a profile, displayInputs is false */}
                <div className="detail">
                  <div id="profile-categories">Daily Price: </div>
                  {!displayInputs && (
                    <div className="attribute">
                      {userBusiness && userBusiness.price}
                    </div>
                  )}
                  {displayInputs && (
                    <div className="attribute">
                      <input
                        type="number"
                        className="profile-input"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                  )}
                </div>
                {/* NOTE TO MIKU!! input for availability should go here */}
              </div>
            </div>

            <div id="edit-button-container">
              {/* this button will display only if user is not in editing mode */}
              {!displayInputs && (
                <button id="edit-button" onClick={() => setDisplayInputs(true)}>
                  Edit
                </button>
              )}

              {/* this button will display only if user is editing details
        when clicked, it should post new details to user pool and db */}
              {displayInputs && (
                <button className="edit-button" onClick={updateBizTable}>
                  Save
                </button>
              )}
            </div>

            {/* cancel button will change it to the profile instead of */}
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
            <BookingsAll />
          </section>
        </div>
      )}

      {/* future bookings is set in the middle of this code */}
      {/* future booking has its own branch : futureBookings */}
    </div>
  );
}

export default Business;
