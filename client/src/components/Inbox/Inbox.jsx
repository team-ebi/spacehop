import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../useContext/UserContext";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faArrowCircleLeft,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import cornerLogo from "../../images/spacehop-name.png";
import Messages from "../Messages/Messages";
import axios from "axios";
import "./Inbox.css";

export default function Inbox() {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [displayMobileMsg, setDisplayMobileMsg] = useState(false);
  const [selectedThread, setSelectedThread] = useState(null);
  const [allMessages, setAllMessages] = useState([]);

  // will connect to aws or default to localhost
  const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";

  useEffect(() => {
    async function fetchMessage() {
      if (user) {
        let req = axios.get(`${baseUrl}/api/messages/${user.attributes.email}`);
        let res = await req;
        let data = res.data;
        let result = data.map((thread) => {
          const parsedMsg = JSON.parse(thread.message);
          thread.message = parsedMsg;
          return thread;
        });
        setAllMessages(result);
      }
    }
    fetchMessage();
  }, [user]);

  function goBack() {
    return history.goBack();
  }

  return (
    // this is just the header section with a header and for mobile, back button & corner logo
    <div id="inbox-container">
      <div className="back-icon" onClick={goBack}>
        <FontAwesomeIcon
          icon={faArrowCircleLeft}
          size="lg"
          color="darkslategrey"
        />
        <span className="back-text">Back</span>
      </div>
      <div className="corner-logo-container">
        <img
          className="corner-logo web"
          alt="spacehop-logo"
          src={cornerLogo}
        ></img>
      </div>
      <h2
        style={{
          padding: "20px 10px",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Inbox
      </h2>
      {displayMobileMsg && (
        <div id="back-inbox-container">
          <button
            className="back-to-inbox mobile-inbox"
            onClick={() => setDisplayMobileMsg(false)}
          >
            Back to Inbox
          </button>
        </div>
      )}

      {/* this is the  main section with both inbox and selected message sections */}
        {/* this is the main inbox section that lists out all messages */}
        <div id="inbox">
          {/* web version */}
          <div id="message-preview-container" className="web-version">
            <>
              <div>
                <h4 className="inbox-subheader">Messages</h4>
              </div>

              {/* show this here only on mobile 
                otherwise, show it above Message component */}
              <div className="write-new mobile-inbox">
                <div className="new-msg-icon mobile-inbox">
                  <FontAwesomeIcon
                    icon={faEdit}
                    size="2x"
                    color="darkslategrey"
                  />
                </div>
                <div className="dropdown-bookings mobile-inbox">
                  <label for="all-bookings mobile-inbox"> To: </label>
                  <select
                    className="bookings mobile-inbox"
                    name="bookings"
                    onChange={(e) => {
                      setSelectedThread(e.target.value);
                      setDisplayMobileMsg(true);
                    }}
                  >
                    <option>Select a recipient.</option>
                    {allMessages.map((thread) => (
                      <option value={thread}>{thread.business_id}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* map over all message to display in the inbox list */}
              {allMessages.map((thread, index) => (
                <div
                  className="single-preview"
                  onClick={() => {
                    setSelectedThread(thread);
                    setDisplayMobileMsg(true);
                  }}
                >
                  <div className="inbox-profile-container">
                    <FontAwesomeIcon
                      className="icon"
                      icon={faUserCircle}
                      size="lg"
                      color="darkslategrey"
                    />
                  </div>
                  <div className="message-preview">
                    <div className="biz-name-messenger">Business Name Here</div>
                    <div className="preview">
                      {thread.message[0].business_message
                        ? thread.message[0].business_message
                        : thread.message[0].user_message}
                    </div>
                  </div>
                </div>
              ))}
            </>
          </div>

          {/* mobile version of inbox list, take up whole page*/}
          {!displayMobileMsg && (
            <div id="message-preview-container" className="mobile-inbox">
              <>
                <div>
                  <h4 className="inbox-subheader">Messages</h4>
                </div>

                {/* show this here only on mobile */}
                <div className="write-new mobile-inbox">
                  <div className="new-msg-icon mobile-inbox">
                    <FontAwesomeIcon
                      icon={faEdit}
                      size="2x"
                      color="darkslategrey"
                    />
                  </div>
                  <div className="dropdown-bookings mobile-inbox">
                    <label for="all-bookings mobile-inbox"> To: </label>
                    <select
                      className="bookings mobile-inbox"
                      name="bookings"
                      onChange={(e) => {
                        setSelectedThread(e.target.value);
                        setDisplayMobileMsg(true);
                      }}
                    >
                      <option>Select a recipient.</option>
                      {allMessages.map((thread) => (
                        <option value={thread}>{thread.business_id}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* map over all message to display in the inbox list */}
                {allMessages.map((thread, index) => (
                  <div
                    className="single-preview"
                    onClick={() => {
                      setSelectedThread(thread);
                      setDisplayMobileMsg(true);
                    }}
                  >
                    <div className="inbox-profile-container">
                      <FontAwesomeIcon
                        className="icon"
                        icon={faUserCircle}
                        size="lg"
                        color="darkslategrey"
                      />
                    </div>
                    <div className="message-preview">
                      <div className="biz-name-messenger">
                        Business Name Here
                      </div>
                      <div className="preview">
                        {thread.message[0].business_message
                          ? thread.message[0].business_message
                          : thread.message[0].user_message}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            </div>
          )}

          <div id="selected-message-container" className="web-version">
            <div className="write-new">
              <div className="new-msg-icon">
                <FontAwesomeIcon
                  icon={faEdit}
                  size="2x"
                  color="darkslategrey"
                />
              </div>
              <div className="dropdown-bookings">
                <label for="all-bookings"> To: </label>
                <select
                  value={selectedThread}
                  className="bookings"
                  name="bookings"
                  onChange={(e) => setSelectedThread(e.target.value)}
                >
                  <option>Select a recipient.</option>
                  {allMessages.map((thread) => (
                    <option key={thread.business_id} value={thread}>
                      {thread.business_id}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {selectedThread && <Messages selectedThread={selectedThread} />}
          </div>

          {displayMobileMsg && selectedThread && (
            <div className="mobile-inbox">
              <Messages selectedThread={selectedThread} />
            </div>
          )}
        </div>
    </div>
  );
}
