import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav/Nav";
import Search from "./components/Search/Search";
import List from "./components/List/List";
// useContext 
import {BusinessContext} from "./components/BusinessContext/BusinessContext";
import About from "./components/About/About"
import Team from "./components/Team/Team"
import BizCard from "./components/BizCard/BizCard"
import Profile from "./components/Profile/Profile"

export default function App() {
  const [businesses, setBusinesses] = useState([]); 

  return (
    <div className="App">
      {/* useContext */}
      <BusinessContext.Provider value={{businesses, setBusinesses}}>
      <Nav />
        <Switch>
          <Route path="/" exact component={Search} />
          <Route path="/profile" component={Profile} />
          <Route path="/about" component={About} />
          <Route path="/team" component={Team} />
          <Route path="/list" component={List} />
        </Switch>
        </BusinessContext.Provider>
    </div>
  );
}

// export default withAuthenticator(App);
