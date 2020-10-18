import React, { useState } from "react";
import "./Messages.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import moment from 'moment'

export default function Messages({ selectedMessage, setSelectedMessage }) {
  return (
    <>
      {/* <h1 id="selected-message-header">Message</h1> */}
      <div id="selected-message">
        <div className="inbox-header">
          <p className="biz-name-message">{selectedMessage.sender}</p>
          <hr className="divider"/>
        </div>
        <div id="message-sender">{selectedMessage.sender}</div>
        <div className="message-body-container">{selectedMessage.message}
        <div id="message-time">  {moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}</div>
        </div>
        <form onSubmit={(e)=>{
          e.preventDefault()
          console.log(e.target.message_input.value)
        }} className="submit-container">
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
