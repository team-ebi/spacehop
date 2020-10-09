import React, { useState } from "react";
import "./App.css";
import Nav from "./components/Nav/Nav";
import Search from "./components/Search/Search";
import List from "./components/List/List";
import BizCard from "./components/BizCard/BizCard";
// useContext 
import {BusinessContext} from "./components/BusinessContext/BusinessContext";

function App() {

  return (
    <div className="App">
      {/* <Nav />
      <Search />
      <List /> */}
      {/* useContext */}
      <BusinessContext.Provider value="test: spacehop is the best">
      <Nav />
      <Search />
      <List />
      </BusinessContext.Provider>
    </div>
  );
}

export default App;
