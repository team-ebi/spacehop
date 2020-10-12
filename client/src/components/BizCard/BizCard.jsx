import React, { useState, useContext } from "react";
import Data from "../../data/businesses";
import List from "../List/List";
import "./BizCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {
  faBuilding,
  faPhone,
  faYenSign,
  faMapPin,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
// useContext
import { BusinessContext } from "../useContext/BusinessContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import DatePicker from "react-datepicker";
import logo from "../../images/logo.png";

require("dotenv").config();

export default function BizCard({ props }) {
  const [bookingDate, setBookingDate] = useState("");
  const [bookingStartTime, setBookingStartTime] = useState("");
  const [bookingEndTime, setBookingEndTime] = useState("");

  // props passed to router's useHistory
  const biz = props.location.state.state;

  //url for server
  const url = process.env.AWS_BACKEND_URL || "http://localhost:4000/api/stripecheckout/checkoutsession"

  //publishable stripe API key
  const stripePromise = loadStripe(
    "pk_test_51HU0G2CjwFEQ1pgcvOchnwo0Gsb2seN5a3xGz8Q2iCvlVUjHkSCV7UZHy3NfeobxNNMeGwmiosi3UBxjbKcSjGZ000hENfQW0F"
  );

  //handles stripe checkout and redirects to checkout page
  async function stripeCheckoutHandler() {
    const stripe = await stripePromise;
    const response = await fetch(
     url,
      { method: "POST" }
    );
    const session = await response.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      alert("Payment Error");
    }
  }

  return (
    <div id="bizcard-container">
      <div className="corner-logo-container">
        <img className="corner-logo" src={logo}></img>
      </div>
      <div id="bizcard-location-container">
        {/* Elements helps load stripe */}
        <Elements stripe={stripePromise}>
          <div id="image-cell">
            <img
              id="bizcard-image"
              src="https://www.japan-guide.com/g9/2005_01b.jpg"
            />
          </div>
          <div>
            <div id="bizcard-name">
              <h2>{biz.name}</h2>
            </div>
            <div id="bizcard-location-cell">
              <div id="info-cell">
                <div id="bizcard-location">
                  <FontAwesomeIcon
                    className="icon"
                    icon={faMapPin}
                    size="lg"
                    color="darkslategrey"
                  />
                  <div>
                    {biz.address_street} <br />
                    {biz.address_city}, {biz.address_zip}
                  </div>
                </div>

                <div id="bizcard-phone">
                  <FontAwesomeIcon
                    className="icon"
                    icon={faPhone}
                    size="lg"
                    color="darkslategrey"
                  />
                  <div>{biz.phone}</div>
                </div>

                <div id="bizcard-type">
                  <FontAwesomeIcon
                    className="icon"
                    icon={faBuilding}
                    size="lg"
                    color="darkslategrey"
                  />
                  {biz.business_type[0].toUpperCase() +
                    biz.business_type.slice(1)}
                </div>

                <div id="bizcard-capacity">
                  <FontAwesomeIcon
                    className="icon"
                    icon={faUsers}
                    size="lg"
                    color="darkslategrey"
                  />
                  {biz.capacity}
                </div>

                <div id="bizcard-price info">
                  <FontAwesomeIcon
                    className="icon"
                    icon={faYenSign}
                    size="lg"
                    color="darkslategrey"
                  />
                  {Number(biz.price).toLocaleString()}
                </div>
              </div>

              <hr className="divider" id="mobile-divider"></hr>

              <div id="booking-details">
                <div id="booking-header">Your booking:</div>
                <div id="booking-subheader">{"Total Price:"}</div>
                <div id="booking-price">
                  ¥{Number(biz.price).toLocaleString()}
                </div>
                <hr className="divider" id="booking-divider"></hr>
                <div id="booking-subheader">{"Date & Time:"}</div>
                <div id="datetime-container">
                  <div className="booking-time" id="booking-date-container">
                    <DatePicker
                      className="booking-date-input"
                      selected={bookingDate}
                      placeholderText="When?"
                      onChange={(date) => setBookingDate(date)}
                    />
                  </div>
                  <div id="booking-time-container">
                    <div className="booking-time single-time-container">
                      <DatePicker
                        className="booking-date-input time"
                        selected={bookingStartTime}
                        placeholderText="Start time?"
                        onChange={(startTime) => setBookingStartTime(startTime)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={60}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                      />
                    </div>
                    <div className="booking-time single-time-container">
                      <DatePicker
                        className="booking-date-input time"
                        selected={bookingEndTime}
                        placeholderText="End time?"
                        onChange={(endTime) => setBookingEndTime(endTime)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={60}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                      />
                    </div>
                  </div>
                </div>

                <div className="booking-button-container">
                  <button
                    label="book"
                    id="book-button"
                    value="Book"
                    onClick={stripeCheckoutHandler}
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Elements>
      </div>
    </div>
  );
}
