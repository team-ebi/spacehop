import React, { useState, useEffect, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import { BusinessContext } from "./components/useContext/BusinessContext";
import { UserContext } from "./components/useContext/UserContext";
import Nav from "./components/Nav/Nav";
import Search from "./components/Search/Search";
import Profile from "./components/Profile/Profile";
import List from "./components/List/List";
import About from "./components/About/About";
import Team from "./components/Team/Team";
import BizCard from "./components/BizCard/BizCard";
import Data from "./data/businesses";
import Success from "./components/Success/Success";
import { onAuthUIStateChange } from "@aws-amplify/ui-components";
import { Auth } from "aws-amplify";

export default function App() {
  const [businesses, setBusinesses] = useState(Data);
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState(null);

  // checks if user is signed in and fetches user data
  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  useEffect(() => {
    async function init() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setUser(user);
      } catch (e) {
        console.error(e);
      }
    }
    init();
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <BusinessContext.Provider value={{ businesses, setBusinesses }}>
          <Nav />
          <Switch>
            <Route path="/" exact component={Search} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/about" exact component={About} />
            <Route path="/team" exact component={Team} />
            <Route path="/list" exact component={List} />
            <Route
              path="/booking/:name"
              render={(propTypes) => <BizCard props={propTypes} />}
            />
            <Route path="/success" exact component={Success} />
          </Switch>
        </BusinessContext.Provider>
      </UserContext.Provider>
    </div>
  );
}
