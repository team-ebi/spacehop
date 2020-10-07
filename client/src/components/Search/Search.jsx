import React, { useState } from "react";
import "./Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

export default function Search() {
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState({lat: null, lng: null})

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setLocation(value);
    setCoordinates(latLng);
  };

  return (
    <div id="search-container">
      <div id="search-bar">
        <div className="input" id="location-input">
          <div className="input-header field">Location</div>
          <div>
            <PlacesAutocomplete
              value={location}
              onChange={setLocation}
              onSelect={handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <input id="location-input" {...getInputProps({ placeholder: "Where to?" })} />
                  <div id="autocomplete-selections">
                    {loading ? <div>...loading</div> : null}
                    {suggestions.map((suggestion) => {
                      const style = {
                        backgroundColor: suggestion.active ? "#80cc37" : "white",
                        padding: "7px",
                      }
                      return <div {...getSuggestionItemProps(suggestion, {style})}>{suggestion.description}</div>
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </div>
        </div>
        <div className="input">
          <div className="input-header field">Date</div>
          <div>
            <input
              id="date-input"
              type="datetime-local"
              className="field"
            ></input>
          </div>
        </div>

        {/* when this button is clicked, list of available
        businesses will be displayed */}
        <button id="search-button">
          <div>
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </div>
          <div id="search-text">Search</div>
        </button>
      </div>
    </div>
  );
}
