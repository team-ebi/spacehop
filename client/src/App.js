import React from "react";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav/Nav";
import Search from "./components/Search/Search";
import List from "./components/List/List";
import {
  AmplifyAuthenticator,
  AmplifySignIn,
  withAuthenticator,
  AmplifySignOut,
} from "@aws-amplify/ui-react";
import About from "./components/About/About"
import Team from "./components/Team/Team"
import BizCard from "./components/BizCard/BizCard"

export default function App() {
  return (
    <div className="App">
      <Nav />
        <Switch>
          <Route path="/" exact component={Search} />
          <Route path="/about" component={About} />
          <Route path="/team" component={Team} />
          <Route path="/list" component={List} />
        </Switch>
    </div>
  );
}

// export default withAuthenticator(App);
