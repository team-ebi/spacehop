import React, { useState, useContext, useEffect } from "react";
import "./Inbox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import Messages from "../Messages/Messages";
import { UserContext } from "../useContext/UserContext";
import axios from "axios";

export default function Inbox() {
  const [selectedMessage, setSelectedMessage] = useState();
  // const [selectedMessage, setSelectedMessage] = useState(messages[0]);
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [newMessage, setNewMessage] = useState();
  const [messages, setMessages] = useState([]);

  // will connect to aws or default to loalhost
  const baseUrl = "http://localhost:4000";
  // const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";


  useEffect(() => {

    async function fetchMessage() {
      if (user) {
        let req = axios.get(`${baseUrl}/api/messages/${user.attributes.email}`);
        let res = await req;
        let data = res.data;
        console.log(data)
        setMessages(data)
      }
    }
    fetchMessage();
  }, [user]);


  function messageHandler() {
    console.log(selectedMessage);
    // return history.push("/inbox/message");
  }

  return (
  
  );
}
