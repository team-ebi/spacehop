import React from "react";
import "./App.css";
import Nav from "./components/Nav/Nav";
import Search from "./components/Search/Search";
import List from "./components/List";

function App() {
  return (
    <div className="App">
      <Nav />
      <Search />
      <List />
    </div>
  );
}

export default App;
