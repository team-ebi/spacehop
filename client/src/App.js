import React from "react";
import "./App.css";
import Nav from "./components/Nav";
import Search from "./components/Search";
import List from "./components/List";

function App() {
  return (
    <div className="App">
        <Nav />
      <div id="overlay"></div>
      <div id="hero">
        <Search />
      </div>
      <List />
    </div>
  );
}

export default App;
