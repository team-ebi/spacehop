import React, { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "../useContext/UserContext";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleLeft,
  faImages
} from "@fortawesome/free-solid-svg-icons";
import cornerLogo from "../../images/spacehop-name.png";
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
  const [images, setImages] = useState([]);
  const [availability, setAvailability] = useState({
    Sunday: { startTime: "", endTime: "" },
    Monday: { startTime: "", endTime: "" },
    Tuesday: { startTime: "", endTime: "" },
    Wednesday: { startTime: "", endTime: "" },
    Thursday: { startTime: "", endTime: "" },
    Friday: { startTime: "", endTime: "" },
    Saturday: { startTime: "", endTime: "" },
  });

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // will either display user's biz profile or a form to register business
  const [displayBizPage, setDisplayBizPage] = useState(false);
  const [displayInputs, setDisplayInputs] = useState(false);
  const [submittedForm, setSubmittedForm] = useState(false);

  // states for upcoming reservation - not yet implemented
  const [display, setDisplay] = useState("upcoming");
  const [dimUpcoming, setDimUpcoming] = useState("");
  const [dimPast, setDimPast] = useState("dim");

  // will connect to aws or default to loalhost
  const baseUrl = process.env.BACKEND_URL || "http://localhost:4000";

  // fetch user's business
  useEffect(() => {
    async function fetchUserBiz() {
      // check if user is logged in
      if (user) {
        // check to see if user has a business associated with their account
        // if so, set userBusiness to their business
        const res = await axios({
          method: "POST",
          url: `${baseUrl}/api/users/account`,
          data: { email: user.attributes.email },
        });
        if (res.data.length > 0) {
          const biz = res.data[0];
          setDisplayInputs(false);
          setDisplayBizPage(true);
          setUserBusiness(biz);
          setSubmittedForm(false);
          setBusinessName(biz.name);
          setAddressStreet(biz.address_street);
          setAddressCity(biz.address_city);
          setAddressZip(biz.address_zip);
          setPhone(biz.phone);
          setBizType(biz.business_type);
          setCapacity(biz.capacity);
          setPrice(biz.price);

          for (const avail of biz.availabilities) {
            const update = availability[avail.day];
            const date1 = new Date();
            const date2 = new Date();
            date1.setHours(avail.start_hour, 0);
            date2.setHours(avail.end_hour, 0);
            update.startTime = date1;
            update.endTime = date2;
            setAvailability({ ...availability, update });
          }
        } else {
          setDisplayInputs(false);
        }
      }
    }
    fetchUserBiz();
  }, [user]);

  // if the user adds their business,
  // this function should pull from component state and
  // patch to db
  async function updateBusinessDetails() {
    try {
      let res;

      // parse availability
      const availArray = [];
      // loop through availabilities to post/patch to db
      for (const day in availability) {
        const obj = {};
        if (
          availability[day].startTime &&
          availability[day].endTime &&
          day !== "update"
        ) {
          obj.day = day;
          obj.start_hour = availability[day].startTime.getHours();
          obj.end_hour = availability[day].endTime.getHours();
          availArray.push(obj);
        }
      }
      // if user business already exists, send patch request
      if (userBusiness) {
        res = await axios.patch(`${baseUrl}/api/businesses/`, {
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
        const avail = await axios.patch(
          `${baseUrl}/api/availability/${userBusiness.id}`,
          {
            availabilities: availArray,
          }
        );
        res.data[0].availability = avail;
      }

      // if user business does not exist, send post request
      else if (!userBusiness) {
        console.log("posting");
        res = await axios.post(`${baseUrl}/api/businesses/`, {
          email: user.attributes.email,
          name: businessName,
          address_street: addressStreet,
          address_city: addressCity,
          address_zip: addressZip,
          phone: phone,
          business_type: bizType,
          capacity: capacity,
          price: price,
          availability: availArray,
        });
        console.log("finish posting", res.data[0]);
        setSubmittedForm(true);
      }

      setUserBusiness(res.data[0]);
      setBusinessName(res.data[0].name);
      setAddressStreet(res.data[0].address_street);
      setAddressCity(res.data[0].address_city);
      setAddressZip(res.data[0].address_zip);
      setPhone(res.data[0].phone);
      setBizType(res.data[0].business_type);
      setCapacity(res.data[0].capacity);
      setPrice(res.data[0].price);
      setDisplayInputs(false);
    } catch (err) {
      alert("There was an error with your request. Please try again later.");
    }
  }

  // when user clicks to add a new business,
  // the inputs will be displayed
  // but the profile info will be hidden
  function addBiz() {
    setDisplayInputs(true);
    setDisplayBizPage(false);
  }

  function updateAvailability(time, selectedDay, type) {
    const update = availability[selectedDay];
    update[type] = time;
    setAvailability({ ...availability, update });
  }

  function displayUpcoming() {
    setDisplay("upcoming");
    setDimPast("dim");
    setDimUpcoming("");
  }

  function displayPast() {
    setDisplay("past");
    setDimPast("");
    setDimUpcoming("dim");
  }

  // initializing react router's useHistory hook
  const history = useHistory();
  function goBack() {
    return history.goBack();
  }

  // create ref for input button
  const hiddenFileInput = useRef(null);

  // open file for image upload
  function openFile() {
    hiddenFileInput.current.click();
  }

  // upload image
  function uploadImage() {
    // insert yusuke's code
  }

  return (
    <div id="biz-profile-container">
      <div className="back-icon" onClick={goBack}>
        <FontAwesomeIcon
          icon={faArrowCircleLeft}
          size="lg"
          color="darkslategrey"
        />
        <span className="back-text">Back</span>
      </div>
      <div className="corner-logo-container">
        <img
          className="corner-logo web"
          alt="spacehop-logo"
          src={cornerLogo}
        ></img>
      </div>

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
                <div className="biz-img-preview">
                  <FontAwesomeIcon
                    icon={faImages}
                    size="8x"
                    color="darkslategrey"
                  />
                </div>
                <div className="upload-btn-container">
                  <button className="upload-img-button" onClick={openFile}>
                    Update Photos
                  </button>
                  <input
                    name="business_photos"
                    ref={hiddenFileInput}
                    accept="image/*"
                    type="file"
                    id="biz-photo-file"
                    onInput={uploadImage}
                    hidden=""
                  ></input>
                </div>
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

            {/* datepicker will update business available  state */}
            <div id="availability-container">
              <div id="weekly-available-title">
                <p>Weekly availablility: </p>
              </div>
            </div>

            {(displayInputs || userBusiness) && (
              <div id="availability-input-container">
                {daysOfWeek.map((day) => (
                  <div className="availability-input" key={day}>
                    <div className="availability-day">{day}</div>
                    <div className="availability-time">
                      <div className="availability-startTime">
                        <label className="availability-label">Start Time</label>
                        {displayInputs && (
                          <DatePicker
                            className="avail-time-input"
                            selected={availability[day].startTime}
                            name={day}
                            onChange={(time) =>
                              updateAvailability(time, day, "startTime")
                            }
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={60}
                            timeCaption="Start Time"
                            dateFormat="h:mm aa"
                          />
                        )}
                        {!displayInputs && userBusiness && (
                          <div>
                            {availability[day].startTime && (
                              <p className="timeslots">
                                {availability[day].startTime.getHours() + ":00"}
                              </p>
                            )}
                            {!availability[day].startTime && (
                              <p className="unavailable timeslots">X</p>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="availability-endTime">
                        <label className="availability-label">End Time</label>
                        {displayInputs && (
                          <DatePicker
                            className="avail-time-input"
                            selected={availability[day].endTime}
                            name={day}
                            onChange={(time) => {
                              updateAvailability(time, day, "endTime");
                            }}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={60}
                            timeCaption="End Time"
                            dateFormat="h:mm aa"
                            returnValue="end"
                          />
                        )}
                        {!displayInputs && (
                          <div>
                            {availability[day].endTime && (
                              <p className="timeslots">
                                {availability[day].endTime.getHours() + ":00"}
                              </p>
                            )}
                            {!availability[day].endTime && (
                              <p className="unavailable timeslots">X</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

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
                <button className="edit-button" onClick={updateBusinessDetails}>
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
            <div id="availability-container">
              <div id="biz-res-title">
                <p>Upcoming Reservations:</p>
              </div>
              <div id="biz-reservations">
                {userBusiness && userBusiness.reservations.length === 0 && (
                  <p>No upcoming reservations</p>
                )}

                {userBusiness && userBusiness.reservations.length > 0 && (
                  <>
                    <div id="upcoming-past-button-container">
                      <button
                        className={`selected-button ${dimUpcoming}`}
                        onClick={displayUpcoming}
                      >
                        Upcoming
                      </button>
                      <button
                        className={`selected-button ${dimPast}`}
                        onClick={displayPast}
                      >
                        Past
                      </button>
                    </div>
                    <div id="res-table">
                      {userBusiness.reservations
                        .filter((booking) => {
                          const today = new Date();
                          const resDate = new Date(booking.date);
                          if (display === "past") {
                            return resDate < today;
                          } else {
                            return resDate >= today;
                          }
                        })
                        .map((booking) => (
                          <div>{booking.name}</div>
                        ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </section> */}
        </div>
      )}
    </div>
  );
}

export default Business;
