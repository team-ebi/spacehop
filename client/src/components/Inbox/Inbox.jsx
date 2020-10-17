import React, { useState } from "react";
import "./Inbox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

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
    { sender: "Macchan", message: "Thanks." }
  ]);
  const [selectedMessage, setSelectedMessage] = useState();
  const history = useHistory();

  function messageHandler() {
    console.log(selectedMessage)
    return history.push("/inbox/message");
  }

  return (
    <div id="inbox-container">
      <h1 id="inbox-header">Messages</h1>
      {messages.map((message, index) => {
        return (
          <ul id="message"
            onClick={() => {
              console.log(message[index]);
              setSelectedMessage(message[index]);
              messageHandler();
            }}
          >
            <hr className="divider" />
            <FontAwesomeIcon
              className="icon"
              icon={faUserCircle}
              size="lg"
              color="darkslategrey"
            />
            <span className="biz-name-message">{message.sender}</span> <br />
            {message.message}
          </ul>
        );
      })}
    </div>
  );
}
