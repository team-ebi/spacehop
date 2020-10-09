import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import { BusinessContext } from "./components/useContext/BusinessContext";
import Nav from "./components/Nav/Nav";
import Search from "./components/Search/Search";
import Profile from "./components/Profile/Profile";
import List from "./components/List/List";
import About from "./components/About/About";
import Team from "./components/Team/Team";
import BizCard from "./components/BizCard/BizCard";
import Data from "./data/businesses";

export default function App() {
  const [businesses, setBusinesses] = useState(Data);

  return (
    <div className="App">
      <BusinessContext.Provider value={{ businesses, setBusinesses }}>
        <Nav />
        <Switch>
          <Route path="/" exact component={Search} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/about" exact component={About} />
          <Route path="/team" exact component={Team} />
          <Route path="/list" exact component={List} />
        </Switch>
      </BusinessContext.Provider>
    </div>
  );
}

// export default withAuthenticator(App);
