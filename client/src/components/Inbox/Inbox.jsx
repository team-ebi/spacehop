import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../useContext/UserContext";
import { UserBusinessContext } from "../useContext/BusinessContext";
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
  const { userBusiness } = useContext(UserBusinessContext);
  const [selectedThread, setSelectedThread] = useState("");
  const [allUserMessages, setAllUserMessages] = useState([]);
  const [allBusinessMessages, setAllBusinessMessages] = useState([]);
  const [displayInboxList, setDisplayInboxList] = useState(true);
  const [displayMessages, setDisplayMessages] = useState("userMessages");

  // will connect to aws or default to localhost
  const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";

  // this is for dropdown menu, will check each message's biz id
  // and see if it matches value of option selected
  function updateSelected(e) {
    const businessId = Number(e.target.value);
    // checking all user messages
    for (const message of allUserMessages) {
      if (message.business_id === businessId) {
        setSelectedThread(message);
        setDisplayInboxList(false);
        return;
      }
    }
    // checking all biz messages
    for (const message of allBusinessMessages) {
      if (message.business_id === businessId) {
        setSelectedThread(message);
        setDisplayInboxList(false);
        return;
      }
    }
  }

  // will fetch all of user's messages
  useEffect(() => {
    async function fetchMessage() {
      if (user) {
        let req = axios.get(`${baseUrl}/api/messages/${user.attributes.email}`);
        let res = await req;
        let data = res.data;
        let businessResults;
        // sorting from most recent to oldest
        // mapping through to parse each message thread
        let userResults = data.user_messages
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map((thread) => {
            const parsedMsg = JSON.parse(thread.message);
            thread.message = parsedMsg;
            return thread;
          });
        setAllUserMessages(userResults);

        // if user is also a biz owner, then will do the same for biz messages
        if (data.business_messages && data.business_messages.length > 0) {
          businessResults = data.business_messages
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map((thread) => {
              const parsedMsg = JSON.parse(thread.message);
              thread.message = parsedMsg;
              return thread;
            });
        }
        setAllBusinessMessages(businessResults);
      }
    }
    fetchMessage();
  }, [user, displayMessages, displayInboxList]);

  // will go back to previous
  function goBack() {
    return history.goBack();
  }

  return (
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
          padding: "10px 10px",
          marginBottom: "10px",
          textAlign: "center",
        }}
      >
        Inbox
      </h2>
      <div className="inbox-buttons">
        {userBusiness && (
          <div className="inbox-toggle">
            <span className="toggle-text">User</span>
            <label className="switch">
              <input
                type="checkbox"
                onChange={() => {
                  displayMessages === "userMessages"
                    ? setDisplayMessages("businessMessages")
                    : setDisplayMessages("userMessages");
                  setDisplayInboxList(true);
                  setSelectedThread(null);
                }}
              />
              <span className="slider round"></span>
            </label>
            <span className="toggle-text">Business</span>
          </div>
        )}

        <div id="back-inbox-container" className="mobile-version">
          <button
            className="back-to-inbox"
            onClick={() => setDisplayInboxList(true)}
          >
            Back to Inbox
          </button>
        </div>
      </div>

      <div id="inbox">
        {displayInboxList && (
          <div id="message-preview-container" className="mobile-version">
            <>
              <div>
                <h4 className="inbox-subheader">Messages</h4>
              </div>

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
                    {displayMessages === "userMessages" &&
                      allUserMessages
                        .sort(
                          (a, b) =>
                            new Date(b.created_at) - new Date(a.created_at)
                        )
                        .map((thread, index) => (
                          <option
                            key={"mobile" + thread.business_id + index}
                            value={thread.business_id}
                          >
                            {thread.business_name}
                          </option>
                        ))}
                    {displayMessages === "businessMessages" &&
                      allBusinessMessages
                        .sort(
                          (a, b) =>
                            new Date(b.created_at) - new Date(a.created_at)
                        )
                        .map((thread) => (
                          <option
                            key={"mobile" + thread.business_id}
                            value={thread.business_id}
                          >
                            {thread.user_first_name +
                              " " +
                              thread.user_last_name}
                          </option>
                        ))}
                  </select>
                </div>
              </div>

              {displayMessages === "userMessages" &&
                allUserMessages
                  .sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                  )
                  .map((thread) => (
                    <div
                      className="single-preview"
                      key={"mobile-version" + thread.business_name}
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
                          {thread.message[thread.message.length - 1]
                            .business_message
                            ? thread.message[thread.message.length - 1]
                                .business_message
                            : thread.message[thread.message.length - 1]
                                .user_message}
                        </div>
                      </div>
                    </div>
                  ))}
              {displayMessages === "businessMessages" &&
                allBusinessMessages
                  .sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                  )
                  .map((thread) => (
                    <div
                      className="single-preview"
                      key={"mobile-version" + thread.user_last_name}
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
                          {thread.user_first_name + " " + thread.user_last_name}
                        </div>
                        <div className="preview">
                          {thread.message[thread.message.length - 1]
                            .business_message
                            ? thread.message[thread.message.length - 1]
                                .business_message
                            : thread.message[thread.message.length - 1]
                                .user_message}
                        </div>
                      </div>
                    </div>
                  ))}
            </>
          </div>
        )}

        <div id="message-preview-container" className="web-version">
          <>
            <div>
              <h4 className="inbox-subheader">Messages</h4>
            </div>

            {displayMessages === "userMessages" &&
              allUserMessages
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .map((thread) => (
                  <div
                    className="single-preview"
                    key={"web-version" + thread.business_name}
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
                        {thread.message[thread.message.length - 1]
                          .business_message
                          ? thread.message[thread.message.length - 1]
                              .business_message
                          : thread.message[thread.message.length - 1]
                              .user_message}
                      </div>
                    </div>
                  </div>
                ))}
            {displayMessages === "businessMessages" &&
              allBusinessMessages
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .map((thread) => (
                  <div
                    className="single-preview"
                    key={"web-version" + thread.user_first_name}
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
                        {thread.message[thread.message.length - 1]
                          .business_message
                          ? thread.message[thread.message.length - 1]
                              .business_message
                          : thread.message[thread.message.length - 1]
                              .user_message}
                      </div>
                    </div>
                  </div>
                ))}
          </>
        </div>

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
                {displayMessages === "userMessages" &&
                  allUserMessages
                    .sort(
                      (a, b) => new Date(b.created_at) - new Date(a.created_at)
                    )
                    .map((thread) => (
                      <option
                        key={"web" + thread.business_name}
                        value={thread.business_name}
                      >
                        {thread.business_name}
                      </option>
                    ))}
                {displayMessages === "businessMessages" &&
                  allBusinessMessages
                    .sort(
                      (a, b) => new Date(b.created_at) - new Date(a.created_at)
                    )
                    .map((thread) => (
                      <option
                        key={"web" + thread.user_first_name}
                        value={thread.business_id}
                      >
                        {thread.user_first_name + " " + thread.user_last_name}
                      </option>
                    ))}
              </select>
            </div>
          </div>
          {selectedThread && (
            <Messages
              selectedThread={selectedThread}
              displayMessages={displayMessages}
            />
          )}
        </div>

        {!displayInboxList && (
          <div id="mobile-selected-message-container">
            {selectedThread && (
              <Messages
                selectedThread={selectedThread}
                displayMessages={displayMessages}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
