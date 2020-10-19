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
import "./Inbox.css";

export default function Inbox() {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [displayMobileMsg, setDisplayMobileMsg] = useState(false);

  const messages = [
    { user_messages: "Hello, do you have wi-fi at the izakaya?" },
    { business_messages: "Yes, we have unlimited wi-fi" },
    { user_messages: "Sounds good! Thank you for responding." },
    {
      user_messages:
        "I am sorry, I have one more question - Do you have many electrical outlets at the izakaya?",
    },
    {
      business_messages:
        "No problem! Yes we have many easily accessible outlets here and also have extension cords.",
    },
    { user_messages: "Oh, okay thank you. I will see you soon!" },
    {
      user_messages:
        "Hello, I am sorry to message you but I think I forgot my laptop charger at your izakaya. Has anyone seen it?",
    },
    {
      business_messages:
        "Oh no, we are sorry to hear that! We will check if it is here now! We will get back to you soon.",
    },
    { user_messages: "Thank you so much." },
    {
      business_messages:
        "We have found your laptop charger! Would you like us to send it to you?",
    },
    {
      user_messages:
        "Oh great! Thank you so much. I can come pick it up later today. Thank you again.",
    },
    { business_messages: "Okay, sounds great. See you later." },
  ];

  const [allMessages, setAllMessages] = useState([
    { user: 1, biz: "Ebi-Chan", message: messages },
    { user: 1, biz: "Macchan", message: messages },
    { user: 1, biz: "Maku", message: messages },
    { user: 1, biz: "Ebi-Chan2", message: messages },
    { user: 1, biz: "Macchan2", message: messages },
    { user: 1, biz: "Maku2", message: messages },
    { user: 1, biz: "Ebi-Chan3", message: messages },
    { user: 1, biz: "Macchan3", message: messages },
    { user: 1, biz: "Maku3", message: messages },
  ]);
  const [selectedThread, setSelectedThread] = useState({
    user: 1,
    biz: "Ebi-Chan",
    message: messages,
  });
  const [test, setTest] = useState(null);

  // fetch all of user's messages
  useEffect(() => {}, []);

  function openMessage() {}

  function goBack() {
    return history.goBack();
  }

  return (
    // this is just the header section with mobile back button, logo, and header
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

      {/* this is the  main section with both inbox and selected message sections */}
      <main id="main-inbox">
        {/* this is the main inbox section that lists out all messages */}
        <div id="inbox">
          {!displayMobileMsg && (
            <div id="message-preview-container">
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
                        <option value={thread}>{thread.biz}</option>
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
                      <div className="biz-name-messenger">{thread.biz}</div>
                      <div className="preview">
                        {thread.message[0].business_message
                          ? thread.message[0].business_messages
                          : thread.message[0].user_messages}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            </div>
          )}

          <div id="selected-message-container">
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
                    <option key={thread.biz} value={thread}>
                      {thread.biz}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {selectedThread && <Messages selectedThread={selectedThread} />}
          </div>
          <div id="mobile-msg-box">
            {displayMobileMsg && selectedThread && (
              <Messages selectedThread={selectedThread} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
