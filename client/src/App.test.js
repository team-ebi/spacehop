import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

it('renders without crashing', () => {
  // creates div element
  const div = document.createElement("div");

  // appends App component to div
  ReactDOM.render(<App/>, div)

  // unmounts div
  ReactDOM.unmountComponentAtNode(div);
});
