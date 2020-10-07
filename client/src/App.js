import React from "react";
import "./App.css";
import Nav from "./components/Nav/Nav";
import Search from "./components/Search";
import List from "./components/List";

function App() {
  return (
    <div className="App">
      <div id="overlay"></div>
      <div id="hero">
        <Nav />
        <Search />
      </div>
      <List />
    </div>
  );
}

export default App;
