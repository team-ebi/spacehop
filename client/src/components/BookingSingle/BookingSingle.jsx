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
  const [review, setReview] = useState(null);
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState(null);

  
  async function fetchReview() {
    if (user) {
      const res = await axios.get(
        `/${booking.business_id}/${user.attributes.email}`
      );
      setReview(res.data)
      setRating(res.data.point);
      setComment(res.data.comment || null);
    }
  }

  useEffect(() => {
    fetchReview();
  }, [user]);

  async function postReview() {
    await axios.post(`/api/ratings/`, {
      email: user.attributes.email,
      business_id: booking.business_id,
      point: rating,
      comment: comment
    });
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
        <div id="booking-date">
          <FontAwesomeIcon
            icon={faCalendarAlt}
            size="med"
            color="darkslategrey"
          />
          {"  " + moment(booking.date).format('ll')}
        </div>
        <div id="booking-time">
          <FontAwesomeIcon icon={faClock} size="med" color="darkslategrey" />
          {"  " + booking.start_hour}:00 - {booking.end_hour}:00
        </div>
      </div>
      <hr className="biz-info-divider"></hr>
      <div className="detail-row">
        {`${booking.address_street} ${booking.address_city}, Tokyo ${booking.address_zip}`}
      </div>
      <div className="detail-row">{booking.phone}</div>
      {display === "past" && (
        <>
          <hr className="biz-info-divider"></hr>
          <div className="star-rating">
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
          {review && <div className="review-header">Your Review: </div>}
          <div className="rating">{rating} Stars</div>
          <div>
            {!review && (
              <textArea
                className="comment"
                value={rating}
                onChange={(e) => setComment(e.target.value)}
              ></textArea>
            )}

            {review && !comment && "You left no comments for this space."}

            {review && comment && <div className="quote">"{comment}"</div>}
          </div>

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
