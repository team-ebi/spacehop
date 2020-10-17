import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
  faArrowCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../useContext/UserContext";
import {
  LocationContext,
  DateContext,
  StartTimeContext,
  EndTimeContext,
} from "../useContext/Search";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import logo from "../../images/logo.png";
import Rating from "@material-ui/lab/Rating";

import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { DatePicker, TimePicker } from "@material-ui/pickers";
import cornerLogo from "../../images/spacehop-name.png";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#80cc37",
    },
    secondary: {
      main: "#000",
    },
  },
});

require("dotenv").config();

export default function BizCard({ props }) {
  const { user } = useContext(UserContext);

  // useContext will pull from previous search
  //  will be updated if user selects new date and time for booking
  const { date, setDate } = useContext(DateContext);
  const { startTime, setStartTime } = useContext(StartTimeContext);
  const { endTime, setEndTime } = useContext(EndTimeContext);

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
    if (!date || !startTime || !endTime) {
      setPickDate(true);
      setPickFuture(false);
      return;
    }
    const today = new Date();
    if (date < today) {
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

  const baseUrl = process.env.BACKEND_URL || "http://localhost:4000";

  useEffect(() => {
    const ac = new AbortController();
    async function getRating() {
      let res = await axios.get(`${baseUrl}/api/ratings/${biz.business_id}`);
      setUserReviews(res.data);

      return () => ac.abort(); // Abort fetch on unmount
    }
    getRating();
  }, [biz.business_id]);

  //post reservation to database
  async function reservationHandler() {
    await axios
      .post(`${baseUrl}/api/reservations/`, {
        email: user.attributes.email,
        date: date,
        price: biz.price,
        business_id: biz.id,
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // initializing react router's useHistory hook
  const history = useHistory();
  function goBack() {
    return history.goBack();
  }

  return (
    <div id="bizcard-container">
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
      <div id="bizcard-location-container">
        {/* Elements helps load stripe */}
        <Elements stripe={stripePromise}>
          <div id="image-cell">
            <img
              id="bizcard-image"
              alt="izakaya"
              src="https://www.japan-guide.com/g9/2005_01b.jpg"
            />
          </div>
          <div>
            <div id="bizcard-name">
              <h2 id="bizcard-name-text">{biz.name}</h2>
              <Rating
                id="bizcard-rating"
                name="half-rating-read"
                defaultValue={Math.ceil(biz.avg * 2) / 2}
                precision={0.5}
                readOnly
                size="medium"
              />
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
                <hr className="divider" />
                <div id="bizcard-user-review">
                  <div id="reviews-header">Reviews</div>
                  {userReviews.length &&
                    userReviews.map((review) => {
                      return (
                        <>
                          <div
                            key={review.id}
                            className="bizcard-review"
                          >{`"${review.comment}"`}</div>
                        </>
                      );
                    })}
                  {!userReviews.length && (
                    <div className="bizcard-review">
                      No reviews for this space yet.
                    </div>
                  )}
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
                    <ThemeProvider theme={theme}>
                      <DatePicker
                        autoOk
                        className="booking-date-input"
                        label="Date"
                        value={date}
                        onChange={(date) => setDate(date)}
                        animateYearScrolling
                        disablePast={true}
                        cancelLabel={false}
                        okLabel={false}
                        InputProps={{
                          disableUnderline: true,
                        }}
                      />
                    </ThemeProvider>
                  </div>
                  <div id="booking-time-container">
                    <div className="booking-time single-time-container">
                      <ThemeProvider theme={theme}>
                        <TimePicker
                          autoOk
                          className="booking-date-input booking-time"
                          label="Start Time"
                          className="date-input"
                          value={startTime}
                          onChange={(time) => setStartTime(time)}
                          disablePast={true}
                          cancelLabel={false}
                          okLabel={false}
                          views={["hours"]}
                          InputProps={{
                            disableUnderline: true,
                          }}
                        />
                      </ThemeProvider>
                    </div>
                    <div className="booking-time single-time-container">
                      <ThemeProvider theme={theme}>
                        <TimePicker
                          autoOk
                          className="booking-date-input booking-time"
                          label="End Time"
                          className="date-input"
                          value={endTime}
                          onChange={(time) => setEndTime(time)}
                          disablePast={true}
                          views={["hours"]}
                          cancelLabel={false}
                          okLabel={false}
                          InputProps={{
                            disableUnderline: true,
                          }}
                        />
                      </ThemeProvider>
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
