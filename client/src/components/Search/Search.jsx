import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Search.css";
// useContext
import { BusinessContext } from "../useContext/BusinessContext";
import {useHistory} from 'react-router-dom';
import axios from "axios";
import logo from "../../images/logo.png";

export default function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [location, setLocation] = useState("");
  // may or may not need coordinates
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [selectedDate, setSelectedDate] = useState("");

  //variable to access routes history
  const history = useHistory()

  // handles location update when location is selected in input
  const handleLocationSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setLocation(value);
    setCoordinates(latLng);
  };

  //handle local routing
  function routerHandler() {
    return history.push("/list");
  }

  //test----- fetching data from database 
  async function fetchAllData(){
    console.log("I'm in fetchAllData!"); 
  const req = axios.get("http://localhost:3000/api/availability/data");
  const res = await req; 
  console.log(res); 
  const data = res.data; 
  console.log(data);
  }
  fetchAllData();


  return (
    <div id="search-container">
      <div id="logo-container">
        <img id="logo" src={logo} alt="logo"/>
      </div>
      
      <div id="search-bar">
        {/* this google maps api autofill location search will update
        location and coordinates states*/}
        <div className="input" id="location-input">
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
                      backgroundColor: suggestion.active ? "#80cc37" : "white",
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
        <div className="input">
          <DatePicker
            id="date-input"
            placeholderText="When?"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            name="selectedDate"
            timeFormat="HH:00"
            dateFormat="MMMM d, yyyy h:mm aa"
            showTimeSelect
          />
        </div>

        {/* when this button is clicked, list of available
        businesses will be displayed */}
        <button id="search-button" onClick={routerHandler}>
          <div>
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </div>
          <div id="search-text">Search</div>
        </button>
      </div>
    </div>
  );
}
