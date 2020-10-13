import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../useContext/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import BookingsAll from "../BookingsAll/BookingsAll";
import axios from "axios";
import "./Business.css";
//miku edit below for availability section
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  const [availability, setAvailability] = useState([]);

  //miku edit below for availability section
  const [sundayStart, setSundayStart] = useState(null);
  const [sundayEnd, setSundayEnd] = useState(null);
  const [mondayStart, setMondayStart] = useState(null);
  const [mondayEnd, setMondayEnd] = useState(null);
  const [tuesStart, setTuesStart] = useState(null);
  const [tuesEnd, setTuesEnd] = useState(null);
  const [wedStart, setWedStart] = useState(null);
  const [wedEnd, setWedEnd] = useState(null);
  const [thursStart, setThursStart] = useState(null);
  const [thursEnd, setThursEnd] = useState(null);
  const [friStart, setFriStart] = useState(null);
  const [friEnd, setFriEnd] = useState(null);
  const [satStart, setSatStart] = useState(null);
  const [satEnd, setSatEnd] = useState(null);

  // will either display user's biz profile or a form to register business
  const [displayBizPage, setDisplayBizPage] = useState(false);
  const [displayInputs, setDisplayInputs] = useState(false);
  const [submittedForm, setSubmittedForm] = useState(false);

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
          setSubmittedForm(false);
          setDisplayInputs(false);
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

  // if the user adds their business,
  // this function should pull from component state and
  // patch to db
  async function updateBizTable() {
    try {
      for (const day of availability) {
        if (day["day"] === "Monday" && !day["start_hour"] && !day["end_hour"]) {
          const startHour = new Date(mondayStart).getHours();
          const endHour = new Date(mondayEnd).getHours();
          day["start_hour"] = startHour;
          day["end_hour"] = endHour;
          setAvailability([...availability, day]);
        } else if (
          day["day"] === "Tuesday" &&
          !day["start_hour"] &&
          !day["end_hour"]
        ) {
          const startHour = new Date(tuesStart).getHours();
          const endHour = new Date(tuesEnd).getHours();
          day["start_hour"] = startHour;
          day["end_hour"] = endHour;
          setAvailability([...availability, day]);
        } else if (
          day["day"] === "Wednesday" &&
          !day["start_hour"] &&
          !day["end_hour"]
        ) {
          const startHour = new Date(wedStart).getHours();
          const endHour = new Date(wedEnd).getHours();
          day["start_hour"] = startHour;
          day["end_hour"] = endHour;
          setAvailability([...availability, day]);
        } else if (
          day["day"] === "Thursday" &&
          !day["start_hour"] &&
          !day["end_hour"]
        ) {
          const startHour = new Date(thursStart).getHours();
          const endHour = new Date(thursEnd).getHours();
          day["start_hour"] = startHour;
          day["end_hour"] = endHour;
          setAvailability([...availability, day]);
        } else if (
          day["day"] === "Friday" &&
          !day["start_hour"] &&
          !day["end_hour"]
        ) {
          const startHour = new Date(friStart).getHours();
          const endHour = new Date(friEnd).getHours();
          day["start_hour"] = startHour;
          day["end_hour"] = endHour;
          setAvailability([...availability, day]);
        } else if (
          day["day"] === "Saturday" &&
          !day["start_hour"] &&
          !day["end_hour"]
        ) {
          const startHour = new Date(satStart).getHours();
          const endHour = new Date(satEnd).getHours();
          day["start_hour"] = startHour;
          day["end_hour"] = endHour;
          setAvailability([...availability, day]);
        } else if (
          day["day"] === "Sunday" &&
          !day["start_hour"] &&
          !day["end_hour"]
        ) {
          const startHour = new Date(sundayStart).getHours();
          const endHour = new Date(sundayEnd).getHours();
          day["start_hour"] = startHour;
          day["end_hour"] = endHour;
          setAvailability([...availability, day]);
        }
      }
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
      console.log("posted to db!");
      setSubmittedForm(true);
      setDisplayInputs(false);
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

  function updateAvailableDay(e) {
    const availDay = e.target.value;
    const newAvail = { day: availDay };
    setAvailability([...availability, newAvail]);
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
              </div>
            </div>

            {/* NOTE TO MIKU!! input for availability should go here */}
            {/* datepicker will update business available  state */}
            <div id="weekly-available-title">
              <p>Weekly availablility: </p>
            </div>

            <div id="availability-input-container">
              <div className="availability-input">
                <div className="availability-day">Sun.</div>
                <div className="availability-checkbox">
                  <input
                    className="checkbox-body"
                    type="checkbox"
                    value="Sunday"
                    onInput={updateAvailableDay}
                  />
                </div>
                <div className="availability-time">
                  <div className="availability-startTime">
                    <DatePicker
                      className="avail-time-input"
                      value={sundayStart}
                      placeholderText="Start time?"
                      key="Sunday"
                      onChange={(time) => setSundayStart(time)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={60}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                    />
                  </div>
                  <div className="availability-endTime">
                    <DatePicker
                      className="avail-time-input"
                      selected={sundayEnd}
                      placeholderText="End time?"
                      onChange={(endTime) => setSundayEnd(endTime)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={60}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                    />
                  </div>
                </div>
              </div>

              <div className="availability-input">
                <div className="availability-day">Mon.</div>
                <div className="availability-checkbox">
                  <input
                    className="checkbox-body"
                    type="checkbox"
                    value="Monday"
                    onInput={updateAvailableDay}
                  />
                </div>
                <div className="availability-time">
                  <div className="availability-startTime">
                    <DatePicker
                      className="avail-time-input"
                      selected={mondayStart}
                      placeholderText="Start time?"
                      onChange={(time) => setMondayStart(time)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={60}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                    />
                  </div>
                  <div className="availability-endTime">
                    <DatePicker
                      className="avail-time-input"
                      selected={mondayEnd}
                      placeholderText="End time?"
                      onChange={(endTime) => setMondayEnd(endTime)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={60}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                    />
                  </div>
                </div>
              </div>

              <div className="availability-input">
                <div className="availability-day">Tue.</div>
                <div className="availability-checkbox">
                  <input
                    className="checkbox-body"
                    type="checkbox"
                    value="Tuesday"
                    onInput={updateAvailableDay}
                  />
                </div>
                <div className="availability-time">
                  <div className="availability-startTime">
                    <DatePicker
                      className="avail-time-input"
                      selected={tuesStart}
                      placeholderText="Start time?"
                      onChange={(startTime) => setTuesStart(startTime)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={60}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                    />
                  </div>
                  <div className="availability-endTime">
                    <DatePicker
                      className="avail-time-input"
                      selected={tuesEnd}
                      placeholderText="End time?"
                      onChange={(endTime) => setTuesEnd(endTime)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={60}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                    />
                  </div>
                </div>
              </div>

              <div className="availability-input">
                <div className="availability-day">Wed.</div>
                <div className="availability-checkbox">
                  <input
                    className="checkbox-body"
                    type="checkbox"
                    value="Wednesday"
                    onInput={updateAvailableDay}
                  />
                </div>
                <div className="availability-time">
                  <div className="availability-startTime">
                    <DatePicker
                      className="avail-time-input"
                      selected={wedStart}
                      placeholderText="Start time?"
                      onChange={(startTime) => setWedStart(startTime)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={60}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                    />
                  </div>
                  <div className="availability-endTime">
                    <DatePicker
                      className="avail-time-input"
                      selected={wedEnd}
                      placeholderText="End time?"
                      onChange={(endTime) => setWedEnd(endTime)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={60}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                    />
                  </div>
                </div>
              </div>

              <div className="availability-input">
                <div className="availability-day">Thu.</div>
                <div className="availability-checkbox">
                  <input
                    className="checkbox-body"
                    type="checkbox"
                    value="Thursday"
                    onInput={updateAvailableDay}
                  />
                </div>
                <div className="availability-time">
                  <div className="availability-startTime">
                    <DatePicker
                      className="avail-time-input"
                      selected={thursStart}
                      placeholderText="Start time?"
                      onChange={(startTime) => setThursStart(startTime)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={60}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                    />
                  </div>
                  <div className="availability-endTime">
                    <DatePicker
                      className="avail-time-input"
                      selected={thursEnd}
                      placeholderText="End time?"
                      onChange={(endTime) => setThursEnd(endTime)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={60}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                    />
                  </div>
                </div>
              </div>

              <div className="availability-input">
                <div className="availability-day">Fri.</div>
                <div className="availability-checkbox">
                  <input
                    className="checkbox-body"
                    type="checkbox"
                    value="Friday"
                    onInput={updateAvailableDay}
                  />
                </div>
                <div className="availability-time">
                  <div className="availability-startTime">
                    <DatePicker
                      className="avail-time-input"
                      selected={friStart}
                      placeholderText="Start time?"
                      onChange={(startTime) => setFriStart(startTime)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={60}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                    />
                  </div>
                  <div className="availability-endTime">
                    <DatePicker
                      className="avail-time-input"
                      selected={friEnd}
                      placeholderText="End time?"
                      onChange={(endTime) => setFriEnd(endTime)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={60}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                    />
                  </div>
                </div>
              </div>

              <div className="availability-input">
                <div className="availability-day">Sat.</div>
                <div className="availability-checkbox">
                  <input
                    className="checkbox-body"
                    type="checkbox"
                    value="Saturday"
                    onInput={updateAvailableDay}
                  />
                </div>
                <div className="availability-time">
                  <div className="availability-startTime">
                    <DatePicker
                      className="avail-time-input"
                      selected={satStart}
                      placeholderText="Start time?"
                      onChange={(startTime) => setSatStart(startTime)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={60}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                    />
                  </div>
                  <div className="availability-endTime">
                    <DatePicker
                      className="avail-time-input"
                      selected={satEnd}
                      placeholderText="End time?"
                      onChange={(endTime) => setSatEnd(endTime)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={60}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                    />
                  </div>
                </div>
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

            {submittedForm && (
              <div id="thanks">
                Thank you for registering your business. We will reach out to
                soon to complete the verification process.
              </div>
            )}
          </main>
          <hr id="profile-divider"></hr>
          {/* <section>
            <BookingsAll />
          </section> */}
        </div>
      )}

      {/* future bookings is set in the middle of this code */}
      {/* future booking has its own branch : futureBookings */}
    </div>
  );
}

export default Business;
