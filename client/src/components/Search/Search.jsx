import React, { useContext } from "react";
import "./Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { SearchContext } from "./SearchContext";

export default function Search() {
  // useContext
  const [searchValue, setSearchValue] = useState("");

  return (
    <div id="search-container">
      <div id="search-bar">
        <div className="input" id="location-input">
          <div className="input-header field">Location</div>
          <div>
            <input
              type="dropdown"
              className="field"
              placeholder="Where to?"
            ></input>
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
        <div id="search-button">
          <div>
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </div>
          <div id="search-text">Search</div>
        </div>
      </div>
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        useContext!
      </SearchContext.Provider>
    </div>
  );
}
