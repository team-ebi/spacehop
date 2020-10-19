import React, { useState, useContext } from "react";
import "./Messages.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { UserContext } from "../useContext/UserContext";

export default function Messages({ props, selectedThread }) {
  const { user } = useContext(UserContext);
  const thread = props;
  console.log(props)

  return (
    <>
      {/* <h1 id="selected-message-header">Message</h1> */}
      <div id="message-box">
        <div className="inbox-header">
          <p className="biz-name-message"><span className="to">To: </span> {selectedThread.biz}</p>
        </div>
        <hr className="divider" />

        <div className="message-body-container">
          {selectedThread.message.map((msg) => {
            if (msg.user_messages) {
              return (
                <div className="msg right">
                  <div className="msg-name">You</div>
                  <span className="recipient">{msg.user_messages}</span>
                </div>
              );
            } else {
              return (
                <div className="msg left">
                  <div className="msg-name">{selectedThread.biz}</div>
                  <span className="other-messenger">
                    {msg.business_messages}
                  </span>
                </div>
              );
            }
          })}
        </div>
        <div className="msg-input-area">
          <textarea name="message-input" id="send-message-input" type="text" />
          <FontAwesomeIcon
            id="send-message-button"
            icon={faPaperPlane}
            size="2x"
            color="darkslategrey"
          />
        </div>
      </div>
    </>
  );
}
