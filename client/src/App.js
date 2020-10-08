import React, { useState } from "react";
import "./App.css";
import Nav from "./components/Nav/Nav";
import Search from "./components/Search";
import List from "./components/List/List";
import BizCard from "./components/BizCard/BizCard";

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
