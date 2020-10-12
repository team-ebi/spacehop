import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../useContext/UserContext";
import axios from "axios";
import "./FutureBookings.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faClock } from "@fortawesome/free-solid-svg-icons";

export default function FutureBookings() {
  const { user } = useContext(UserContext);

  // manage state of information about future bookings
  const [futureBookingInfo, setFutureBookings] = useState([
    {
      date: "2020-12-31",
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

  return (
    <div className="bookings-container">
      <header id="res-header">
        <h3>Your upcoming reservations:</h3>
      </header>
      <main id="booking-section">
        {futureBookingInfo.length > 0 && (
          <div id="res-table">
            {futureBookingInfo.map((booking) => (
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
                  <FontAwesomeIcon
                      icon={faClock}
                      size="med"
                      color="darkslategrey"
                    />
                    {"  " + booking.start_time}:00 - {booking.end_time}:00
                  </div>
                </div>
                <hr className="biz-info-divider"></hr>
                <div className="detail-row">
                  {`${booking.address_street} ${booking.address_city}, Tokyo ${booking.address_zip}`}
                </div>
                <div className="detail-row">{booking.phone}</div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
