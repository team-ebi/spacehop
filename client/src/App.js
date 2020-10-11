import React, { useState, useEffect, useContext } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import "./App.css";
import { BusinessContext } from "./components/useContext/BusinessContext";
import { UserContext } from "./components/useContext/UserContext";
import { AuthStateContext } from "./components/useContext/AuthStateContext";
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
  const [businesses, setBusinesses] = useState();
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState(null);

  // checks if user is signed in and fetches user data
  // whenever authUI state changes
  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  // fetches current user at initial render
  // will remember last login
  useEffect(() => {
    async function init() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setUser(user);
        console.log(user);
      } catch (e) {
        console.error(e);
      }
    }
    init();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <UserContext.Provider value={{ user, setUser }}>
          <AuthStateContext.Provider value={{ authState, setAuthState }}>
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
          </AuthStateContext.Provider>
        </UserContext.Provider>
      </div>
    </BrowserRouter>
  );
}
