import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Search.css";
import { BusinessContext } from "../useContext/BusinessContext";
import { UserContext } from "../useContext/UserContext";
import { useHistory } from "react-router-dom";
import axios from "axios";
import logo from "../../images/logo.png";

export default function Search() {
  const [location, setLocation] = useState("");
  // may or may not need coordinates
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [selectedDate, setSelectedDate] = useState("");
  const { user } = useContext(UserContext);
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");
  const { businesses, setBusinesses } = useContext(BusinessContext);

  const baseUrl = process.env.BACKEND_URL || "http://localhost:4000"

  //variable to access routes history
  const history = useHistory();

  // handles location update when location is selected in input
  const handleLocationSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setLocation(value);
    setCoordinates(latLng);
  };

  //handle selected data
  //get entered data from imput
  async function getSelectedData() {
    // parse the location
    const selectedLocation = location.split(",")[0];

    const date = new Date(selectedDate);

    // parse day from selected date
    const week = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const selectedDay = week[date.getDay()];

    // parse time from selected start time
    const startTime = new Date(selectedStartTime).getHours();

    // parse time from selected start time
    const endTime = new Date(selectedEndTime).getHours();

    // set data to axios.get(http://) then get filtered data
    const res = await axios.get(
      `${baseUrl}/api/availability/?day=${selectedDay}&address_city=${selectedLocation}&start_hour=${startTime}&end_hour=${endTime}`
    );

    // set businesses state
    setBusinesses(res.data);
    // open list
    return history.push("/list");
  }

  return (
    <div id="search-container">
      <div id="logo-container">
        <img id="logo" src={logo} alt="logo" />
      </div>

      <div id="mobile-welcome">
        {/* if user is logged in, will greet by name */}
        <h2>{`Welcome${
          user && user.attributes ? ", " + user.attributes.given_name : ""
        }!`}</h2>
      </div>

      <div id="search-bar-container">
        <div id="search-bar">
          {/* this google maps api autofill location search will update
        location and coordinates states*/}
          <div className="input" id="location-input-field">
            <PlacesAutocomplete
              value={location}
              onChange={setLocation}
              onSelect={handleLocationSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <input
                    id="location-input"
                    {...getInputProps({ placeholder: "Where to?" })}
                  />
                  <div id="autocomplete-selections">
                    {loading ? <div>...loading</div> : null}

                    {/* this will delay autofill options as user types */}
                    {suggestions.map((suggestion) => {
                      const style = {
                        backgroundColor: suggestion.active
                          ? "#80cc37"
                          : "white",
                        padding: "7px",
                      };
                      return (
                        <div {...getSuggestionItemProps(suggestion, { style })}>
                          {suggestion.description}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </div>

          {/* datepicker will update selectedDate state */}
          <div className="input time">
            {/* select date */}
            <DatePicker
              className="date-input"
              selected={selectedDate}
              placeholderText="When?"
              onChange={(date) => setSelectedDate(date)}
            />
          </div>
          <div className="input time">
            {/* select start time */}
            <DatePicker
              className="date-input"
              selected={selectedStartTime}
              placeholderText="Start time?"
              onChange={(startTime) => setSelectedStartTime(startTime)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={60}
              timeCaption="Time"
              dateFormat="h:mm aa"
            />
          </div>
          <div className="input time">
            {/* select end time */}
            <DatePicker
              className="date-input"
              selected={selectedEndTime}
              placeholderText="End time?"
              onChange={(endTime) => setSelectedEndTime(endTime)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={60}
              timeCaption="Time"
              dateFormat="h:mm aa"
            />
          </div>
          {/* when this button is clicked, list of available
        businesses will be displayed */}
          <div id="search-button-container">
            <button id="search-button" onClick={getSelectedData}>
              <div>
                <FontAwesomeIcon icon={faSearch} size="lg" />
              </div>
              <div id="search-text">Search</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
