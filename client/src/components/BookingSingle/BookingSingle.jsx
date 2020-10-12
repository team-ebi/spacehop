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

export default function BookingSingle({ booking, display }) {
  const { user } = useContext(UserContext);
  const [rating, setRating] = useState(null);
  const [review, setReview] = useState("");

  //

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
          {"  " + booking.date}
        </div>
        <div id="booking-time">
          <FontAwesomeIcon icon={faClock} size="med" color="darkslategrey" />
          {"  " + booking.start_time}:00 - {booking.end_time}:00
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
            <span className="rating">{rating}</span>
          </div>
          <div>
            <textArea className="comment" value={rating} onChange={(e) => setReview(e.target.value)}></textArea>
          </div>
          <div className="comment-container">
            <button className="comment-submit">Submit</button>
          </div>
        </>
      )}
    </div>
  );
}
