import React, { useState } from "react";
import "./Inbox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import Messages from "../Messages/Messages";

export default function Inbox() {
  const [messages, setMessages] = useState([
    { sender: "Ebi-chan", message: "Thank you!" },
    { sender: "Golden Ball", message: "Please come again!" },
    { sender: "Macchan", message: "Thanks." },
    { sender: "Ebi-chan", message: "Thank you sooooooo much!!!" },
    { sender: "Golden Ball", message: "You left a mess!!!!" },
    { sender: "Macchan", message: "Thanks." },
    { sender: "Ebi-chan", message: "Thank you sooooooo much!!!" },
    { sender: "Golden Ball", message: "You left a mess!!!!" },
    { sender: "Macchan", message: "Thanks." },
  ]);
  const [selectedMessage, setSelectedMessage] = useState(messages[0])
  const history = useHistory();

  function messageHandler() {
    console.log(selectedMessage);
    // return history.push("/inbox/message");
  }

  return (
    <div>
      <div id="inbox-header">
        <h1>Messages</h1>
      </div>
      <div id="message-container">
        <div className="messages">
          {messages.map((message, index) => {
            return (
              <ul
                id="message"
                onClick={() => {
                  setSelectedMessage(messages[index]);
                  messageHandler();
                }}
              >
                <hr className="message-divider" />
                <FontAwesomeIcon
                  className="icon"
                  icon={faUserCircle}
                  size="lg"
                  color="darkslategrey"
                />
                <span className="biz-name-message">{message.sender}</span>{" "}
                <br />
                {message.message}
              </ul>
            );
          })}
        </div>
        <div className="selected-message-container">
          <Messages selectedMessage={selectedMessage} />
        </div>
      </div>
    </div>
  );
}
