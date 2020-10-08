import React from "react";
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
import { I18n } from "aws-amplify";

I18n.putVocabularies({
  en: {
    "Sign Out": "Log Out",
    "Sign In": "Log In",
  },
});

export default function App() {
  return (
    <div className="App">
      <Nav />
      <Search />
      <List />
    </div>
  );
}

// export default withAuthenticator(App);
