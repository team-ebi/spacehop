import React, { useState, useContext, useEffect } from "react";
import Auth from "../Auth/Auth";
import "./BizCard.css";
import "../Nav/Nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {
  faBuilding,
  faPhone,
  faYenSign,
  faMapPin,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../useContext/UserContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import DatePicker from "react-datepicker";
import logo from "../../images/logo.png";
import Rating from "@material-ui/lab/Rating";
import BizCard_Map from "../BizCard_Map/BizCard_Map";

require("dotenv").config();

export default function BizCard({ props }) {
  const { user } = useContext(UserContext);

  // state will be updated when user selects date and time for booking
  const [bookingDate, setBookingDate] = useState(null);
  const [bookingStartTime, setBookingStartTime] = useState(null);
  const [bookingEndTime, setBookingEndTime] = useState(null);

  // these are just to conditionally render elements
  const [displayLogin, setDisplayLogin] = useState(false);
  const [pickDate, setPickDate] = useState(false);
  const [pickFuture, setPickFuture] = useState(false);
  const [userReviews, setUserReviews] = useState([]);

  // props passed to router's useHistory
  const biz = props.location.state.state;

  //publishable stripe API key
  const stripePromise = loadStripe(
    "pk_test_51HU0G2CjwFEQ1pgcvOchnwo0Gsb2seN5a3xGz8Q2iCvlVUjHkSCV7UZHy3NfeobxNNMeGwmiosi3UBxjbKcSjGZ000hENfQW0F"
  );

  // will not run if user hasn't selected date or date is in the past
  // if user is not logged in, login page will be displayed
  // handles stripe checkout and redirects to checkout page
  // will post new reservation to db
  async function stripeCheckoutHandler() {
    if (!bookingDate || !bookingStartTime || !bookingEndTime) {
      setPickDate(true);
      setPickFuture(false);
      return;
    }
    const today = new Date();
    if (bookingDate < today) {
      setPickDate(false);
      setPickFuture(true);
      return;
    }
    if (!user || !user.attributes) {
      setDisplayLogin(true);
      return;
    }
    try {
      const stripe = await stripePromise;
      const { error } = await stripe
        .redirectToCheckout({
          lineItems: [
            {
              price: biz.stripe_price_id,
              quantity: 1,
            },
          ],
          mode: "payment",
          successUrl: "https://master.dlm7uq8ifxap1.amplifyapp.com/",
          cancelUrl: "https://master.dlm7uq8ifxap1.amplifyapp.com/",
        })
        .then(() => {
          reservationHandler();
        });
    } catch {
      alert("Payment Error");
    }
  }

  const baseUrl = process.env.BACKEND_URL || "http://localhost:4000"

  useEffect(() => {
    async function getRating(){
      let res = await axios.get(`${baseUrl}/api/ratings/${biz.business_id}`);
      setUserReviews(res.data);
    }
    getRating();
  }, [baseUrl, biz.business_id]);

  //post reservation to database
  async function reservationHandler() {
    await axios
      .post(`${baseUrl}/api/reservations/`, {
        email: user.attributes.email,
        date: bookingDate,
        price: biz.price, 
        business_id: biz.id,
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div id="bizcard-container">
      <div className="corner-logo-container">
        <img className="corner-logo" alt="spacehop-logo" src={logo}></img>
      </div>
      <div id="bizcard-location-container">
        {/* Elements helps load stripe */}
        <Elements stripe={stripePromise}>
          <div id="image-cell">
            <img
              id="bizcard-image"
              alt='izakaya'
              src="https://www.japan-guide.com/g9/2005_01b.jpg"
            />
          </div>
          <BizCard_Map props={biz}/>
          <div>
            <div id="bizcard-name">
              <h2>{biz.name}</h2>
            </div>
            <Rating
              id="bizcard-rating"
              name="half-rating-read"
              defaultValue={Math.ceil(biz.avg * 2) / 2}
              precision={0.5}
              readOnly
              size="medium"
            />
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
                <hr className="divider" />
                <div id="bizcard-user-review">
                  <h2 id="reviews-header">Reviews</h2>
                  {userReviews.map((review) => {
                    return <li key={review.id}>{`"${review.comment}"`}</li>;
                  })}
                </div>
              </div>

              <hr className="divider" id="mobile-divider"></hr>

              <div id="booking-details">
                <div id="booking-header">Your booking:</div>
                <div id="booking-subheader">{"Total Price:"}</div>
                <div id="booking-price">
                  ¥{Number(biz.price).toLocaleString()}
                </div>
                {/* <hr className="divider" id="booking-divider"></hr> */}
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
                        className="booking-date-input booking-time"
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
                        className="booking-date-input booking-time"
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
                {pickDate && (
                  <div className="book-message">
                    Please pick a time and date.
                  </div>
                )}
                {pickFuture && (
                  <div className="book-message">
                    Please pick a date in the future.
                  </div>
                )}
              </div>
            </div>
          </div>
        </Elements>
      </div>
      {/* if user tries to book without logging in, Auth component will render.
        pass props to determine which form gets rendered in Auth */}
      {displayLogin && (
        <div className="auth-window-tobook">
          <Auth login={displayLogin} />
        </div>
      )}
    </div>
  );
}
