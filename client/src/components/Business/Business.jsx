import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../useContext/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import BookingsAll from "../BookingsAll/BookingsAll";
import axios from "axios";
import "./Business.css";

function Business() {
  const { user } = useContext(UserContext);
  const [userBusiness, setUserBusiness] = useState(null);
  const [businessName, setBusinessName] = useState("");
  const [addressStreet, setAddressStreet] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressZip, setAddressZip] = useState("");
  const [phone, setPhone] = useState("");
  const [bizType, setBizType] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [price, setPrice] = useState(0);

  const [displayBizPage, setDisplayBizPage] = useState(false);
  const [displayInputs, setDisplayInputs] = useState(false);

  // fetch user's business
  useEffect(() => {
    async function fetchUserBiz() {
      if (user) {
        const res = await axios.get("/businesses/:email");
        setUserBusiness(res.data);
      }
    }
    fetchUserBiz();
  }, [user]);

  // this function should pull from component state and
  // patch to db
  async function updateBizTable() {}

  function addBiz() {
    setDisplayInputs(true)
    setDisplayBizPage(true);
  };

  return (
    <div id="biz-profile-container">
      <h2
        style={{
          padding: "20px 10px",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Business Page
      </h2>
      {!userBusiness && (
        <div id="add-biz-container">
          <button
            id="add-button"
            className="edit-button"
            onClick={addBiz}
          >
            Add your business.
          </button>
        </div>
      )}
      {(displayBizPage || userBusiness) && (
      <div id="section-container">
        <main>
          <div id="profile-info">
            <div id="biz-img">
              <FontAwesomeIcon
                icon={faUserCircle}
                size="8x"
                color="darkslategrey"
              />
            </div>
            <div id="biz-details">
              <div className="detail">
                <div id="profile-categories">Business Name: </div>
                {!displayInputs && (
                  <div className="attribute">
                    {userBusiness && userBusiness.name}
                  </div>
                )}
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
                      className="profile-input"
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                    />
                  </div>
                )}
              </div>

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
                      className="profile-input"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
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
              <button className="edit-button" onClick={updateBizTable}>
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
          <BookingsAll />
        </section>
      </div>)}

      {/* future bookings is set in the middle of this code */}
      {/* future booking has its own branch : futureBookings */}
    </div>
  );
}

export default Business;
