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
  const [futureBookingInfo, setFutureBookings] = useState([
    {
      date: "2020-09-07",
      price: 10000,
      start_time: 11,
      end_time: 16,
      created_at: "2020-11-29",
      business_id: 1,
      user_id: 1,
      name: "Spacehop Cafe",
      address_street: "1st Street",
      address_city: "Roppongi",
      address_zip: "777",
      phone: "0123-456-789",
      business_type: "Cafe",
      capacity: 10,
      price: 1000,
    },
    {
      date: "2020-12-4",
      price: 20000,
      start_time: 11,
      end_time: 16,
      created_at: "2020-11-29",
      business_id: 1,
      user_id: 1,
      name: "Bunny Cafe",
      address_street: "1st Street",
      address_city: "Roppongi",
      address_zip: "777",
      phone: "0123-456-789",
      business_type: "Cafe",
      capacity: 10,
      price: 1000,
    },
    {
      date: "2020-12-4",
      price: 20000,
      start_time: 11,
      end_time: 16,
      created_at: "2020-11-29",
      business_id: 1,
      user_id: 1,
      name: "Bunny Cafe",
      address_street: "1st Street",
      address_city: "Roppongi",
      address_zip: "777",
      phone: "0123-456-789",
      business_type: "Cafe",
      capacity: 10,
      price: 1000,
    },
  ]);

  // will run when component is first rendered
  useEffect(() => {
    async function fetchBookings() {
      const reservations = await axios.get("/reservations");
      setFutureBookings(reservations.data);
    }
    fetchBookings();
  }, []);

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
               <BookingSingle booking={booking} display={display}/>
              ))}
          </div>
        )}
      </main>
    </div>
  );
}

