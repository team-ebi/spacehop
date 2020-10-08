import React, { useState } from "react";
import "./App.css";
import Nav from "./components/Nav/Nav";
import Search from "./components/Search/Search";
import List from "./components/List/List";
import { AppContext } from "./AppContext";

function App() {
  // useContext
  const [appValue, setAppValue] = useState("");

  return (
    <div className="App">
      <Nav />
      <Search />
      <List />
      {/* useContext */}
      <AppContext.Provider value={{ appValue, setAppValue }}>
        useContext!
      </AppContext.Provider>
    </div>
  );
}

export default App;
