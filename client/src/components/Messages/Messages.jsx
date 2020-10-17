import React, { useState } from 'react'
import "./Messages.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle
} from "@fortawesome/free-solid-svg-icons";

export default function Messages({selectedMessage, setSelectedMessage}) {


function messageHandler() {
  console.log('hello')
}

  return (
    <div id="inbox-container">
      <h1>Message</h1>
      {/* <h1 id="inbox-header">Messages</h1>
        {messages.map((message, index)=>{
         return <ul onClick={messageHandler}>
           <hr className="divider"/>
           <FontAwesomeIcon
                    className="icon"
                    icon={faUserCircle}
                    size="lg"
                    color="darkslategrey"
                  />
           <span className="biz-name-message">{message.sender}</span>  <br/>
            {message.message}
          </ul>
        })} */}
    </div>
  )
}
