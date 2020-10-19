import React, { useState, useContext } from "react";
import "./Messages.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { UserContext } from "../useContext/UserContext";
import axios from "axios";

export default function Messages({
  selectedMessage,
  setSelectedMessage,
  messages,
  setMessages,
}) {
  const { user } = useContext(UserContext);
  // const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";
  const baseUrl = "http://localhost:4000";
  return (
    <>
      {/* <h1 id="selected-message-header">Message</h1> */}
      <div id="selected-message">
        <div className="inbox-header">
          <p className="biz-name-message">"selectedMessage.sender"</p>
          <hr className="divider" />
        </div>
        <div id="message-sender">"selectedMessage.sender"</div>
        <div className="message-body-container">
          "selectedMessage.message"
          <div id="message-time">
            {" "}
            {moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}
          </div>
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            // await axios.patch(baseUrl + `/api/messages/${user.attributes.email}/:biz`, {
            //   user_message: e.target.message_input.value
            // } );
            let newMsg = e.target.message_input.value
            setMessages([...messages, newMsg]);
          }}
          className="submit-container"
        >
          <input name="message_input" id="send-message-input" type="text" />
          <button type="submit">
            <FontAwesomeIcon
              id="send-message-button"
              icon={faPaperPlane}
              size="lg"
              color="darkslategrey"
            />
          </button>
        </form>
      </div>
    </>
  );
}
