import React, { useState, useEffect } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import "./App.css";
import {
  BusinessContext,
  UserBusinessContext,
} from "./components/useContext/BusinessContext";
import { UserContext } from "./components/useContext/UserContext";
import { AuthStateContext } from "./components/useContext/AuthStateContext";
import {
  LocationContext,
  DateContext,
  StartTimeContext,
  EndTimeContext,
} from "./components/useContext/Search";
import Nav from "./components/Nav/Nav";
import Search from "./components/Search/Search";
import Profile from "./components/Profile/Profile";
import List from "./components/List/List";
import About from "./components/About/About";
import Team from "./components/Team/Team";
import Business from "./components/Business/Business";
import BizCard from "./components/BizCard/BizCard";
import { onAuthUIStateChange } from "@aws-amplify/ui-components";
import { Auth } from "aws-amplify";
import axios from "axios";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import Inbox from "./components/Inbox/Inbox";
import Messages from "./components/Messages/Messages";
require("dotenv").config();

export default function App() {
  const [businesses, setBusinesses] = useState(null);
  const [userBusiness, setUserBusiness] = useState(null);
  const [authState, setAuthState] = useState(null);
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  // checks if user is signed in and fetches user data
  // whenever authUI state changes
  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, [authState, user]);

  const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";

  useEffect(() => {
    async function checkDatabaseForUser() {
      if (user && user.attributes) {
        const email = user.attributes.email;
        const userExists = await axios.get(`${baseUrl}/api/users/${email}`);
        if (userExists.data.length === 0) {
          await axios.post(`${baseUrl}/api/users/`, {
            first_name: user.attributes.given_name,
            last_name: user.attributes.family_name,
            email: email,
            phone: user.attributes.phone_number,
          });
        }
      }
    }
    checkDatabaseForUser();
  }, [user]);

  // fetches current user at initial render
  // will remember last login
  useEffect(() => {
    async function init() {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();
        setUser(currentUser);
      } catch (e) {
        console.error(e);
      }
    }
    init();
  }, []);

  useEffect(() => {
    async function checkUserBiz() {
      if (user) {
        // check to see if user has a business associated with their account
        // if so, set userBusiness to their business
        const res = await axios({
          method: "POST",
          url: `${baseUrl}/api/users/account`,
          data: { email: user.attributes.email },
        });
        setUserBusiness(res.data[0])
      }
    };
    checkUserBiz();
  }, [user]);

  return (
    <BrowserRouter>
      <div className="App">
        <UserContext.Provider value={{ user, setUser }}>
          <AuthStateContext.Provider value={{ authState, setAuthState }}>
            <BusinessContext.Provider value={{ businesses, setBusinesses }}>
              <UserBusinessContext.Provider
                value={{ userBusiness, setUserBusiness }}
              >
                <LocationContext.Provider value={{ location, setLocation }}>
                  <DateContext.Provider value={{ date, setDate }}>
                    <StartTimeContext.Provider
                      value={{ startTime, setStartTime }}
                    >
                      <EndTimeContext.Provider value={{ endTime, setEndTime }}>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                          <Nav />
                          <Switch>
                            <Route path="/" exact component={Search} />
                            <Route path="/profile" exact component={Profile} />
                            <Route path="/about" exact component={About} />
                            <Route path="/team" exact component={Team} />
                            <Route
                              path="/business"
                              exact
                              component={Business}
                            />
                            <Route path="/inbox" exact component={Inbox} />
                            <Route
                              path="/inbox/message"
                              exact
                              component={Messages}
                            />
                            <Route path="/list" exact component={List} />
                            <Route
                              path="/booking/:name"
                              render={(propTypes) => (
                                <BizCard props={propTypes} />
                              )}
                            />
                          </Switch>
                        </MuiPickersUtilsProvider>
                      </EndTimeContext.Provider>
                    </StartTimeContext.Provider>
                  </DateContext.Provider>
                </LocationContext.Provider>
              </UserBusinessContext.Provider>
            </BusinessContext.Provider>
          </AuthStateContext.Provider>
        </UserContext.Provider>
      </div>
    </BrowserRouter>
  );
}
