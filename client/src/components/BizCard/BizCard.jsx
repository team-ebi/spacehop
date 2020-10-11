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
  faUsers
} from "@fortawesome/free-solid-svg-icons";
// useContext
import { BusinessContext } from "../useContext/BusinessContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

require("dotenv").config();

export default function BizCard({ props }) {
  // props passed to router's useHistory
  const biz = props.location.state.state;

  //publishable stripe API key
  const stripePromise = loadStripe(
    "pk_test_51HU0G2CjwFEQ1pgcvOchnwo0Gsb2seN5a3xGz8Q2iCvlVUjHkSCV7UZHy3NfeobxNNMeGwmiosi3UBxjbKcSjGZ000hENfQW0F"
  );

  //handles stripe checkout and redirects to checkout page
  async function stripeCheckoutHandler() {
    const stripe = await stripePromise;
    const response = await fetch(
      "http://localhost:4000/api/stripecheckout/create-checkout-session",
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

            <div id="booking-details">
              <div id="booking-header">
                Your booking:
              </div>
                <div id="booking-price">
                  ¥{Number(biz.price).toLocaleString()}
                </div>
                <hr className="divider"></hr>
              <div className="detail">
                <div className="booking-title">Date:</div>
                <div>somedate</div>
              </div>
              <div className="detail">
                <div className="booking-title">Start Time:</div>
                <div>blahblah</div>
              </div>
              <div className="detail">
                <div className="booking-title">End Time:</div>
                <div>blahblah</div>
              </div>

              <button
                className="book-button info"
                onClick={stripeCheckoutHandler}
                value="Book"
              >
                Book
              </button>
            </div>
          </div>
        </div>
      </Elements>
    </div>
  );
}
