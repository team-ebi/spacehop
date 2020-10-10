import React, { useState, useContext, useEffect} from "react";
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
  //select date 
  const [selectedDate, setSelectedDate] = useState("");
  //select start time 
  const [selectedStartTime, setSelectedStartTime] = useState("");
  //select end time 
  const [selectedEndTime, setSelectedEndTime] = useState("");

  const { businesses, setBusinesses } = useContext(BusinessContext);

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
  // async function routerHandler() {
  //   await getSelectedData();
  //   return history.push("/list");
  // }

  //test----- fetching data from database 
  // async function fetchAllData(){
  //   console.log("I'm in fetchAllData!"); 
  // const req = axios.get("http://localhost:4000/api/availability/data");
  // const res = await req; 
  // console.log(res); 
  // const data = res.data; 
  // console.log(data);
  // }
  // fetchAllData();

  //test-----fetching selected data from database 
  async function fetchSelectedData(){
  const req = axios.get("http://localhost:4000/api/availability?day=Monday&address_city=Roppongi&start_hour=10&end_hour=11");
  const res = await req; 
  const data = res.data; 
  }
  fetchSelectedData();

  //handle selected data 
  //get entered data from imput 
  async function getSelectedData(){
    // parse the location
    const selectedLocation = location.split(",")[0]

    const date = new Date(selectedDate)
    
    // parse day from selected date
    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const selectedDay = week[date.getDay()];
    console.log(selectedDay)

    // parse time from selected start time
    console.log(selectedStartTime)
    const startTime = new Date(selectedStartTime).getHours()
    console.log(startTime)

    // parse time from selected start time
    console.log(selectedEndTime)
    const endTime = new Date(selectedEndTime).getHours()
    console.log(endTime)

    // set data to axios.get(http://) then get filtered data
    const res = await axios.get(`http://localhost:4000/api/availability?day=${selectedDay}&address_city=${selectedLocation}&start_hour=${startTime}&end_hour=${endTime}`);
    console.log("AXIOS GET ========= ", res.data)
    // const res = await axios.get(`http://localhost:4000/api/availability?day=${selectedDay}&address_city=${selectedLocation}&start_hour=10&end_hour=11`);
    // console.log("AXIOS GET ========= ", res.data)


    // set businesses state
    setBusinesses(res.data);
    // open list
    return history.push("/list");
  }

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
          {/* <DatePicker
            id="date-input"
            placeholderText="When?"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            name="selectedDate"
            timeFormat="HH:00"
            dateFormat="MMMM d, yyyy h:mm aa"
            showTimeSelect
          /> */}
          {/* select date */}
          <DatePicker selected={selectedDate} 
          placeholderText="Date?" 
          onChange={date => setSelectedDate(date)} />
          {/* select start time */}
          <DatePicker
          selected={selectedStartTime}
          placeholderText="Start time?" 
          onChange={startTime => setSelectedStartTime(startTime)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="h:mm aa"
            />
          {/* select end time */}
          <DatePicker
          selected={selectedEndTime}
          placeholderText="End time?" 
          onChange={endTime => setSelectedEndTime(endTime)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="h:mm aa"
            />
        </div>
        {/* when this button is clicked, list of available
        businesses will be displayed */}
        <button id="search-button" onClick={getSelectedData}>
          <div>
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </div>
          <div id="search-text">Search</div>
        </button>
      </div>
    </div>
  );
}
