import React from "react";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav/Nav";
import Search from "./components/Search/Search";
import List from "./components/List/List";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <Nav />
      <Search />
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/list" exact component={List} />
        </Switch>
    </div>
  );
}

export default App;
