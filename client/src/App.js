import React, { useState } from "react";
import "./App.css";
import Nav from "./components/Nav/Nav";
import Search from "./components/Search/Search";
import List from "./components/List/List";
import { AppContext } from "./AppContext";

function App() {
  // useContext
  const [value, setValue] = useState("");

  return (
    <div className="App">
      <Nav />
      <Search />
      <List />
      {/* useContext */}
      <AppContext.Provider value={{ value, setValue }}>
        useContext!
      </AppContext.Provider>
    </div>
  );
}

export default App;
