import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../useContext/UserContext";

export default function Messages({ selectedThread }) {
  const { user } = useContext(UserContext);

  return (
    <>
      {/* <h1 id="selected-message-header">Message</h1> */}
      <div id="message-box">
        <div className="inbox-header">
          <p className="biz-name-message"><span className="to">To: </span>Business Name</p>
        </div>
        <hr className="divider" />

        <div className="message-body-container">
          {selectedThread.message.map((msg) => {
            if (msg.user_message) {
              return (
                <div className="msg right">
                  <div className="msg-name">You</div>
                  <span className="recipient">{msg.user_message}</span>
                </div>
              );
            } else {
              return (
                <div className="msg left">
                  <div className="msg-name">Business Name</div>
                  <span className="other-messenger">
                    {msg.business_message}
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
