import React, { useState, useContext } from "react";
import Data from "../../data/businesses";
import List from "../List/List";
import "./BizCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {
  faBuilding,
  faYenSign,
  faMapPin,
} from "@fortawesome/free-solid-svg-icons";
// useContext
import { BusinessContext } from "../useContext/BusinessContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

require("dotenv").config();

export default function BizCard() {
  //dummy data that can deleted after we fetch
  const [bizData, setBizData] = useState([
    {
      Name: "Ebi-Chan",
      Address: "3 Chome-12-1 Amanuma Suginami City, Tokyo 167-0032",
      Type: "Izakaya",
      Availability: "Monday",
      Price: 5000,
    },
  ]);

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
        {bizData.map((biz, index) => (
          <div id="bizcard-location-cell">
            <img
              id="business-image"
              src="https://www.japan-guide.com/g9/2005_01b.jpg"
            />{" "}
            <br />
            <div id="bizcard-location-name">
              {biz.Name} <br />
            </div>
            <FontAwesomeIcon
              className="icon"
              icon={faMapPin}
              size="lg"
              color="#80CC37"
            />
            {biz.Address} <br />
            <FontAwesomeIcon
              className="icon"
              icon={faBuilding}
              size="lg"
              color="#80CC37"
            />{" "}
            {biz.Type} <br />
            <div>Booking Details:</div>
            Availability:
            <select id="days">
              {/* loop through fetched data */}
              <option value="item">Monday</option>
            </select>{" "}
            <br />
            <FontAwesomeIcon
              className="icon"
              icon={faYenSign}
              size="lg"
              color="#80CC37"
            />{" "}
            {biz.Price} <br />
            <button
              className="book-button"
              onClick={stripeCheckoutHandler}
              value="Book"
            >
              Book
            </button>
          </div>
        ))}
      </Elements>
    </div>
  );
}
