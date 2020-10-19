import React, { useState, useContext } from "react";
import "./Inbox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import Messages from "../Messages/Messages";
import { UserContext } from "../useContext/UserContext";

export default function Inbox() {
  const [messages, setMessages] = useState([{"user_messages":"Hello, do you have wi-fi at the izakaya?"}, {"business_messages": "Yes, we have unlimited wi-fi"}, {"user_messages" : "Sounds good! Thank you for responding."},  {"user_messages" : "I am sorry, I have one more question - Do you have many electrical outlets at the izakaya?"}, {"business_message" : "No problem! Yes we have many easily accessible outlets here and also have extension cords."}, {"user_messages" : "Oh, okay thank you. I will see you soon!"}, {"user_messages" : "Hello, I am sorry to message you but I think I forgot my laptop charger at your izakaya. Has anyone seen it?"}, {"business_messages": "Oh no, we are sorry to hear that! We will check if it is here now! We will get back to you soon."}, {"user_messages" : "Thank you so much."}, {"business_message" : "We have found your laptop charger! Would you like us to send it to you?"}, {"user_messages" : "Oh great! Thank you so much. I can come pick it up later today. Thank you again."}, {"business_message" : "Okay, sounds great. See you later."}]);

  // [
  //   { sender: "Ebi-chan", message: "Thank you!" },
  //   { sender: "Golden Ball", message: "Please come again!" },
  //   { sender: "Macchan", message: "Thanks." },
  //   { sender: "Ebi-chan", message: "Thank you sooooooo much!!!" },
  //   { sender: "Golden Ball", message: "You left a mess!!!!" },
  //   { sender: "Macchan", message: "Thanks." },
  //   { sender: "Ebi-chan", message: "Thank you sooooooo much!!!" },
  //   { sender: "Golden Ball", message: "You left a mess!!!!" },
  //   { sender: "Macchan", message: "Thanks." },
  // ]

  //user messages
  const example = [{"user_messages":"Hello, do you have wi-fi at the izakaya?"}, {"business_messages": "Yes, we have unlimited wi-fi"}, {"user_messages" : "Sounds good! Thank you for responding."},  {"user_messages" : "I am sorry, I have one more question - Do you have many electrical outlets at the izakaya?"}, {"business_message" : "No problem! Yes we have many easily accessible outlets here and also have extension cords."}, {"user_messages" : "Oh, okay thank you. I will see you soon!"}, {"user_messages" : "Hello, I am sorry to message you but I think I forgot my laptop charger at your izakaya. Has anyone seen it?"}, {"business_messages": "Oh no, we are sorry to hear that! We will check if it is here now! We will get back to you soon."}, {"user_messages" : "Thank you so much."}, {"business_message" : "We have found your laptop charger! Would you like us to send it to you?"}, {"user_messages" : "Oh great! Thank you so much. I can come pick it up later today. Thank you again."}, {"business_message" : "Okay, sounds great. See you later."}]

  // other random business inbox messages

  const [selectedMessage, setSelectedMessage] = useState(messages[0])
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [newMessage, setNewMessage] = useState()

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
          <Messages selectedMessage={selectedMessage} messages={messages} setMessages={setMessages} />
        </div>
      </div>
    </div>
  );
}
