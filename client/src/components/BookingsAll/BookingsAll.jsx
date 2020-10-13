import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../useContext/UserContext";
import axios from "axios";
import BookingSingle from "../BookingSingle/BookingSingle";
import "./BookingsAll.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faClock,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

export default function FutureBookings() {
  const { user } = useContext(UserContext);
  const [display, setDisplay] = useState("upcoming");
  const [dimUpcoming, setDimUpcoming] = useState("");
  const [dimPast, setDimPast] = useState("dim");

  // manage state of information about future bookings
  const [futureBookingInfo, setFutureBookings] = useState({});

  const baseUrl = `${process.env.BACKEND_URL} || "http://localhost:4000"`

  // will run when component is first rendered
  useEffect(() => {
    async function fetchBookings() {
      try {
        if (user) {
          const reservations = await axios.get(`${baseUrl}/api/reservations/${user.attributes.email}`);
          console.log("res: ", reservations);
          setFutureBookings(reservations.data);
        }
      } catch (err) {
        console.log('FETCH ERROR: ', err);
      }
    }
    fetchBookings();
  }, [user]);

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

  return (
    <div className="bookings-container">
      <header id="res-header">
        <h3>Your reservations:</h3>
      </header>
      <div id="upcoming-past-button-container">
        <button
          className={`selected-button ${dimUpcoming}`}
          onClick={displayUpcoming}
        >
          Upcoming
        </button>
        <button className={`selected-button ${dimPast}`} onClick={displayPast}>
          Past
        </button>
      </div>
      <main id="booking-section">
        {futureBookingInfo.length > 0 && (
          <div id="res-table">
            {futureBookingInfo
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
                <BookingSingle booking={booking} display={display} />
              ))}
          </div>
        )}
      </main>
    </div>
  );
}
