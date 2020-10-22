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
  const [selectedThread, setSelectedThread] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [displayInboxList, setDisplayInboxList] = useState(true);

  // will connect to aws or default to localhost
  const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";

  function updateSelected(e) {
    const businessId = Number(e.target.value);
    for (const message of allMessages) {
      if (message.business_id === businessId) {
        setSelectedThread(message);
        setDisplayInboxList(false);
        return;
      }
    }
  }

  // will fetch all of user's email messages
  useEffect(() => {
    async function fetchMessage() {
      if (user) {
        let req = axios.get(`${baseUrl}/api/messages/${user.attributes.email}`);
        let res = await req;
        let data = res.data.user_messages;
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

  // will go back to previous
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

      {/* when clicked, will display only the inbox */}
      <div id="back-inbox-container" className="mobile-version">
        <button
          className="back-to-inbox"
          onClick={() => setDisplayInboxList(true)}
        >
          Back to Inbox
        </button>
      </div>

      {/* main section of inbox page that has inbox list and selected message */}
      <div id="inbox">
        {/* inbox that lists preview of user's messages */}
        {displayInboxList && (
        <div id="message-preview-container" className="mobile-version">
          <>
            <div>
              <h4 className="inbox-subheader">Messages</h4>
            </div>

            {/* this dropdown menu should only show on mobile version */}
            <div className="write-new mobile">
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
                  onChange={updateSelected}
                >
                  <option>Select a recipient</option>
                  {allMessages.map((thread) => (
                    <option key={"mobile" + thread.business_id} value={thread.business_id}>
                      {thread.business_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* map over all message to display in the inbox list */}
            {allMessages.map((thread, index) => (
              <div
                className="single-preview"
                onClick={() => {
                  console.log(thread);
                  setSelectedThread(thread);
                  setDisplayInboxList(false);
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
                    {thread.business_name}
                  </div>
                  <div className="preview">
                    {thread.message[thread.message.length - 1].business_message
                      ? thread.message[thread.message.length - 1].business_message
                      : thread.message[thread.message.length - 1].user_message}
                  </div>
                </div>
              </div>
            ))}
          </>
        </div>)}

        {/* this web version will stay on same page */}
        <div id="message-preview-container" className="web-version">
          <>
            <div>
              <h4 className="inbox-subheader">Messages</h4>
            </div>
            
            {/* map over all message to display in the inbox list */}
            {allMessages.map((thread, index) => (
              <div
                className="single-preview"
                onClick={() => {
                  setSelectedThread(thread);
                  setDisplayInboxList(false);
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
                    {thread.business_name}
                  </div>
                  <div className="preview">
                    {thread.message[thread.message.length - 1].business_message
                      ? thread.message[thread.message.length - 1].business_message
                      : thread.message[thread.message.length - 1].user_message}
                  </div>
                </div>
              </div>
            ))}
          </>
        </div>

        {/* this section shows the opened message window for selected message for web*/}
        <div id="selected-message-container">
          <div className="write-new">
            <div className="new-msg-icon">
              <FontAwesomeIcon icon={faEdit} size="2x" color="darkslategrey" />
            </div>
            <div className="dropdown-bookings">
              <label for="all-bookings"> To: </label>
              <select
                value={selectedThread}
                className="bookings"
                name="bookings"
                onChange={updateSelected}
              >
                <option>Select a recipient</option>
                {allMessages.map((thread) => (
                  <option key={"web" + thread.business_name} value={thread.business_id}>
                    {thread.business_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {selectedThread && <Messages selectedThread={selectedThread} />}
        </div>

        {/* mobile version of message container */}
        {!displayInboxList && 
        <div id="mobile-selected-message-container">
          {selectedThread && <Messages selectedThread={selectedThread} />}
        </div>}
      </div>
    </div>
  );
}
