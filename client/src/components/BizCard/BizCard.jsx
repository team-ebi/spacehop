import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Auth from "../Auth/Auth";
import Image from "../Image/Image";
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
  DateContext,
  StartTimeContext,
  EndTimeContext,
} from "../useContext/Search";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Rating from "@material-ui/lab/Rating";
import Map from "../Map/Map";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { DatePicker, TimePicker } from "@material-ui/pickers";
import cornerLogo from "../../images/spacehop-name.png";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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
  const [capacity, setCapacity] = useState("");

  // props passed to router's useHistory
  const biz = props.location.state.state;
  const mapProps = [];
  mapProps.push(biz);

  const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";
  const frontUrl =
    process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";

  //publishable stripe API key
  const stripePromise = loadStripe(
    "pk_test_51HU0G2CjwFEQ1pgcvOchnwo0Gsb2seN5a3xGz8Q2iCvlVUjHkSCV7UZHy3NfeobxNNMeGwmiosi3UBxjbKcSjGZ000hENfQW0F"
  );

  //get difference between hours to send to stripe to get price
  function hoursHandler() {
    const date1 = new Date(startTime * 1000);
    const date2 = new Date(endTime * 1000);
    const hours = Math.round(Math.abs(date1 - date2) / 36e5 / 1000);
    return hours;
  }
  
  // will not run if user hasn't selected date or date is in the past
  // if user is not logged in, login page will be displayed
  // handles stripe checkout and redirects to checkout page
  // will post new reservation to db
  function stripeCheckoutHandler() {
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
      stripePromise
        .then((stripe) => {
          stripe.redirectToCheckout({
            lineItems: [
              {
                price: biz.stripe_price_id,
                quantity: hoursHandler(),
              },
            ],
            mode: "payment",
            successUrl: `${frontUrl}/profile`,
            cancelUrl: `${frontUrl}`,
          });
        })
        .then((result) => {
          reservationHandler();
        });
    } catch {
      alert("Payment Error");
    }
  }

  //convert date to a string to fetch from databasee
  const selectedDate = new Date(date);
  const sendyear = selectedDate.getFullYear();
  const sendmonth = selectedDate.getMonth() + 1;
  const senddate = selectedDate.getDate();

  const dateToSend =
    String(sendyear) + "-" + String(sendmonth) + "-" + String(senddate);

  useEffect(() => {
    const ac = new AbortController();
    async function getRating() {
      let res = await axios.get(`${baseUrl}/api/ratings/${biz.business_id}`);
      setUserReviews(res.data);
      let availabilityRes = await axios.get(
        `${baseUrl}/api/businesses/${biz.id}/${dateToSend}`
      );
      setCapacity(availabilityRes.data);
      return () => ac.abort(); // Abort fetch on unmount
    }
    getRating();
  }, [baseUrl, biz.business_id]);

  //styles for table
  const useStyles = makeStyles({
    table: {
      minWidth: 100,
    },
  });
  const classes = useStyles();

  //create data for table
  function createData(name, seat) {
    return { name, seat };
  }

  //create rows for table
  const rows = [];
  function availabilityHandler() {
    for (const hour in capacity) {
      rows.push(createData(hour + ":", capacity[hour]));
    }
  }
  availabilityHandler();

  //post reservation to database
  async function reservationHandler() {
    const start_at = new Date(startTime);
    const start_at_send = start_at.getHours();
    const end_at = new Date(endTime);
    const end_at_send = end_at.getHours();
    console.log("starting to post to res table");
    try {
      await axios.post(`${baseUrl}/api/reservations/`, {
        email: user.attributes.email,
        date: date,
        price: biz.price,
        business_id: biz.id,
        start_at: start_at_send,
        end_at: end_at_send,
      });
      console.log("finished posting to res table");
    } catch (error) {
      console.log(error);
    }
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
            <Image photos={biz.images} bizId={biz.id} arrows={true} />
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
                <div id="details">
                  <div className="details-section">
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
                  </div>
                  <div>
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
                      {Number(biz.price).toLocaleString() + "/ hour"}
                    </div>
                  </div>
                </div>
                <hr className="divider" />
                <div id="bizcard-user-review">
                  <div id="reviews-header">Reviews</div>
                  {userReviews.length &&
                    userReviews.map((review) => (
                      <div
                        key={review.id}
                        className="bizcard-review"
                      >{`"${review.comment}"`}</div>
                    ))}
                  {!userReviews.length && (
                    <div className="bizcard-review">
                      No reviews for this space yet.
                    </div>
                  )}
                </div>
                {date ? (
                  <div id="reviews-header">{"Availability "}</div>
                ) : (
                  console.log("no")
                )}
                {date ? (
                  <TableContainer
                    className="availability-table"
                    component={Paper}
                  >
                    <Table
                      className={classes.table}
                      size="small"
                      aria-label="a dense table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Hours</TableCell>
                          <TableCell align="center">Seats Open</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow key={row.name}>
                            <TableCell
                              align="center"
                              component="th"
                              scope="row"
                            >
                              {row.name}
                            </TableCell>
                            <TableCell align="center">{row.seat}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  console.log("no")
                )}
              </div>

              <hr className="divider" id="mobile-divider"></hr>

              <div id="booking-details">
                <div id="booking-header">Your booking:</div>
                <div id="booking-subheader">{"Total Price:"}</div>
                <div id="booking-price">
                  {startTime && endTime
                    ? "¥" +
                      (Number(biz.price) * hoursHandler()).toLocaleString()
                    : "¥" + Number(biz.price).toLocaleString()}
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
                  <div className="bizcard-time-container">
                    <div id="booking-time-container">
                      <div className="booking-time single-time-container">
                        <ThemeProvider theme={theme}>
                          <TimePicker
                            autoOk
                            className="booking-date-input booking-time"
                            label="Start Time"
                            className="date-input"
                            value={startTime}
                            onChange={(time) =>
                              setStartTime(time.startOf("hour"))
                            }
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
                            onChange={(time) =>
                              setEndTime(time.startOf("hour"))
                            }
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
            <hr className="map-divider"></hr>
            <Map businesses={mapProps} forBizCard={true} />
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
