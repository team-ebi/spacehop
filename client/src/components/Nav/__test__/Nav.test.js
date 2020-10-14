import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import { UserContext } from "../../useContext/UserContext";
import Nav from "../Nav";

function TestWrapper({ children, userContext }) {
    return (
      <Router>
        <UserContext.Provider value={userContext}>
          {children}
        </UserContext.Provider>
      </Router>
    );
  }

  describe("List", () => {
    it("should render a generiic welcome message if no user is signed in", () => {
      const { getByText } = render(
        <TestWrapper userContext={{}}>
          <Nav />
        </TestWrapper>
      );
      expect(
        getByText("Welcome!")
      ).toBeVisible();
    });

    // need to figure out how to incorporate onAuthUIStateChange
    // it("should welcome user by name if user is signed in", () => {
    //     const { getByText } = render(
    //       <TestWrapper userContext={{user: {attributes: {given_name: "Cat"}}}}>
    //         <Nav />
    //       </TestWrapper>
    //     );
    //     expect(
    //       getByText("Welcome, Cat!")
    //     ).toBeVisible();
    //   });
});


