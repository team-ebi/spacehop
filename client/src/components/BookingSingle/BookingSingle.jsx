import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../useContext/UserContext";
import axios from "axios";
import "../BookingsAll/BookingsAll.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faClock,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

export default function BookingSingle({ booking, display }) {
  const { user } = useContext(UserContext);

  // will be updated if user has a review already in db for the specific location
  const [review, setReview] = useState(null);

  // will be updated if user submits new review
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");

  
  // function will fetch user's review for this space
  async function fetchReview() {
    if (user) {
      const res = await axios.get(
        `api/ratings/${booking.business_id}/${user.attributes.email}`
      );
      if (res.data.length > 0) {
        setReview(res.data[0]);
        setRating(res.data[0].point);
        setComment(res.data[0].comment || "");
      }
    }
  }

  // will run if user changes
  useEffect(() => {
    fetchReview();
  }, [user]);

  // will post review to db
  async function postReview() {
    await axios.post(`/api/ratings/`, {
      email: user.attributes.email,
      business_id: booking.business_id,
      point: rating,
      comment: comment
    });

    // will set review state to the inputs
    setReview({
      user_email: user.attributes.email,
      business_id: booking.business_id,
      point: rating,
      comment: comment
    })
  }

  return (
    <div className="single-booking-container">
      <div>
        <div id="booked-biz-name">{booking.name}</div>
      </div>
      <div className="detail-row">
        {/* booking date is formatted to 'Month Date, Year' with moment module */}
        <div id="booking-date">
          <FontAwesomeIcon
            icon={faCalendarAlt}
            size="1x"
            color="darkslategrey"
          />
          {"  " + moment(booking.date).format('ll')}
        </div>

        {/* adding ':00' to start and end times */}
        <div id="booking-time">
          <FontAwesomeIcon icon={faClock} size="1x" color="darkslategrey" />
          {"  " + booking.start_hour}:00 - {booking.end_hour}:00
        </div>
      </div>

      <hr className="biz-info-divider"></hr>

      <div className="detail-row">
        {`${booking.address_street} ${booking.address_city}, Tokyo ${booking.address_zip}`}
      </div>

      <div className="detail-row">{booking.phone}</div>

      {/* will render past reservations */}
      {display === "past" && (
        <>
          <hr className="biz-info-divider"></hr>
          <div className="star-rating">

            {/* if there is no review, inputs will be displayed */}
            {!review && (
              <>
                <span className="star">
                  <FontAwesomeIcon
                    className="one"
                    icon={faStar}
                    size="med"
                    color="darkslategrey"
                    onClick={() => setRating(1)}
                  />
                </span>

                <span className="star">
                  <FontAwesomeIcon
                    className="two"
                    icon={faStar}
                    size="med"
                    color="darkslategrey"
                    onClick={() => setRating(2)}
                  />
                </span>

                <span className="star">
                  <FontAwesomeIcon
                    className="three"
                    icon={faStar}
                    size="med"
                    color="darkslategrey"
                    onClick={() => setRating(3)}
                  />
                </span>

                <span className="star">
                  <FontAwesomeIcon
                    className="four"
                    icon={faStar}
                    size="med"
                    color="darkslategrey"
                    onClick={() => setRating(4)}
                  />
                </span>

                <span className="star">
                  <FontAwesomeIcon
                    className="five"
                    icon={faStar}
                    size="med"
                    color="darkslategrey"
                    onClick={() => setRating(5)}
                  />
                </span>
              </>
            )}
          </div>

          {/* if review exists already in db, will display "Your Review" header"*/}
          {review && <div className="review-header">Your Review: </div>}
          
          {/* stars will show up when user selects stars on input or when
          user has already reviewed */}
          <div className="rating">{rating} Stars</div>


          <div>
            {/* text area input will show up when there is no review,
            will update comment state */}
            {!review && (
              <textarea
                className="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            )}

            {/* will show up if there is a review but no comment */}
            {review && !comment && "You left no comments for this space."}
            
            {/* will show up if there is a review and a commment */}
            {review && comment && <div className="quote">"{comment}"</div>}
          </div>

          {/* if there is no review, button will show up */}
          {!review && (
            <div className="comment-container">
              <button className="comment-submit" onClick={postReview}>Submit</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
