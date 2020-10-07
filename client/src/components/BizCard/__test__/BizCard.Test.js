import React from "react";
import ReactDOM from "react-dom";
import BizCard from "../BizCard";

it('renders without crashing', () => {
    const div = document.createElement("div");
    ReactDOM.render(<BizCard/>, div)
});

