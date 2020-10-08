import React from "react";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav/Nav";
import Search from "./components/Search/Search";
import List from "./components/List/List";
import Login from "./components/Login";
import About from "./components/About/About"
import Team from "./components/Team/Team"

function App() {
  return (
    <div className="App">
      <Nav />
      <Search />
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/list" exact component={List} />
          <Route path="/about" exact component={About} />
          <Route path="/team" exact component={Team} />
        </Switch>
    </div>
  );
}

export default App;
