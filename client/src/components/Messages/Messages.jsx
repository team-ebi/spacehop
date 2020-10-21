import React, { useContext, useState, useEffect, useRef } from "react";
import { UserBusinessContext } from "../useContext/BusinessContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../useContext/UserContext";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios";
import "../Inbox/Inbox.css";

export default function Messages({ selectedThread, displayMessages }) {
  const { user } = useContext(UserContext);
  const { userBusiness } = useContext(UserBusinessContext);
  const [updatedThread, setUpdatedThread] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";

  useEffect(() => {
    setUpdatedThread(selectedThread.message);
  }, [selectedThread]);

  async function sendMessage() {
    const newThread = [...updatedThread, newMessage];
    setUpdatedThread(newThread);

    // resetting chat box to empty
    if (displayMessages === "userMessages") {
      setNewMessage({ user_message: "" });
    } else {
      setNewMessage({ business_message: "" });
    }

    // patching thread in messages db
    const newSelectedThread = selectedThread;
    newSelectedThread["message"] = newThread;

    // if displaying userMessage, then patch from user as sender
    if (displayMessages === "userMessages") {
      await axios.patch(
        `${baseUrl}/api/messages/${user.attributes.email}/${selectedThread.business_id}`,
        newSelectedThread
      );
    }
    else if (displayMessages === "businessMessages") {
      // if displaying businessMessages, then patch from business as sender
      await axios.patch(
        `${baseUrl}/api/messages/${selectedThread.email}/${userBusiness.id}`,
        newSelectedThread
      );
    }
  }

  return (
    <>
      {/* <h1 id="selected-message-header">Message</h1> */}
      <div id="message-box">
        <div className="inbox-header">
          <p className="biz-name-message">
            <span className="to">To: </span>
            {displayMessages === "userMessages" && selectedThread.business_name}
            {displayMessages === "businessMessages" &&
              `${selectedThread.user_first_name} ${selectedThread.user_last_name}`}
          </p>
        </div>
        <hr className="divider" />

        <ScrollToBottom className="message-body-container">
          {updatedThread &&
            updatedThread.map((msg, index) => {
              // if displaying userMessages, sender will be the user
              if (displayMessages === "userMessages" && msg.user_message) {
                return (
                  <div className="msg right">
                    <div className="msg-name">You</div>
                    <span className="recipient">{msg.user_message}</span>
                  </div>
                );
              } else if (
                displayMessages === "userMessages" &&
                msg.business_message
              ) {
                return (
                  <div className="msg left">
                    <div className="msg-name">
                      {selectedThread.business_name}
                    </div>
                    <span className="other-messenger">
                      {msg.business_message}
                    </span>
                  </div>
                );

                // if displaying businessMessages, sender will be the business
              } else if (
                displayMessages === "businessMessages" &&
                msg.business_message
              ) {
                return (
                  <div className="msg right">
                    <div className="msg-name">You</div>
                    <span className="recipient">{msg.business_message}</span>
                  </div>
                );
              } else if (
                displayMessages === "businessMessages" &&
                msg.user_message
              ) {
                return (
                  <div className="msg left">
                    <div className="msg-name">
                      {`${selectedThread.user_first_name} ${selectedThread.user_last_name}`}
                    </div>
                    <span className="other-messenger">{msg.user_message}</span>
                  </div>
                );
              }
            })}
        </ScrollToBottom>
        <div className="msg-input-area">
          <textarea
            name="message-input"
            id="send-message-input"
            type="text"
            value={displayMessages === "userMessages" ? newMessage.user_message : newMessage.business_message}
            onInput={(e) => displayMessages === "userMessages" ? setNewMessage({ user_message: e.target.value }) : setNewMessage({ business_message: e.target.value })}
          />
          <div id="send-input-icon">
            <FontAwesomeIcon
              id="send-message-button"
              icon={faPaperPlane}
              size="2x"
              color="darkslategrey"
              onClick={sendMessage}
            />
          </div>
        </div>
      </div>
    </>
  );
}
