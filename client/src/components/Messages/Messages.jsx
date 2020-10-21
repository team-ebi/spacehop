import React, { useContext, useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../useContext/UserContext";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios";
import "../Inbox/Inbox.css";

export default function Messages({ selectedThread }) {
  const { user } = useContext(UserContext);
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
    setNewMessage({ user_message: "" });

    // patching thread in messages db
    const newSelectedThread = selectedThread;
    newSelectedThread["message"] = newThread;
    await axios.patch(
      `${baseUrl}/api/messages/${user.attributes.email}/${selectedThread.business_id}`,
      newSelectedThread
    );
  }

  return (
    <>
      {/* <h1 id="selected-message-header">Message</h1> */}
      <div id="message-box">
        <div className="inbox-header">
          <p className="biz-name-message">
            <span className="to">To: </span>
            {selectedThread.business_name}
          </p>
        </div>
        <hr className="divider" />

        <ScrollToBottom className="message-body-container">
          {updatedThread &&
            updatedThread.map((msg) => {
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
                    <div className="msg-name">
                      {selectedThread.business_name}
                    </div>
                    <span className="other-messenger">
                      {msg.business_message}
                    </span>
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
            value={newMessage.user_message}
            onInput={(e) => setNewMessage({ user_message: e.target.value })}
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
