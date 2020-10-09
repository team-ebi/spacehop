import React, { useState, useContext } from "react";
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

export default function App() {
  const [ user, setUser ] = useState({});
  const [businesses, setBusinesses] = useState(Data);

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
            <Route path="/booking/:name" 
              render={(propTypes) => <BizCard props={propTypes}/>}
            />
            <Route path="/success" exact component={Success} />
          </Switch>
        </BusinessContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

// export default withAuthenticator(App);
