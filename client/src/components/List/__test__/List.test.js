import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import { BusinessContext } from "../../useContext/BusinessContext";
import List from "../List";

function TestWrapper({ children, businessContext }) {
  return (
    <Router>
      <BusinessContext.Provider value={businessContext}>
        {children}
      </BusinessContext.Provider>
    </Router>
  );
}

describe("List", () => {
  it("should render a message if there are no results", () => {
    const { getByText } = render(
      <TestWrapper businessContext={{ businesses: [] }}>
        <List />
      </TestWrapper>
    );
    expect(
      getByText("Sorry, no results. Please edit your search.")
    ).toBeVisible();
  });

  xit("should render a message if there is one result", () => {
    const oneBiz = [
      {
        name: "Spacehop Cafe",
        address_street: "1st Street",
        address_city: "Roppongi",
        address_zip: "777",
        phone: "0123-456-789",
        business_type: "Cafe",
        capacity: 10,
        price: 10000,
      },
    ];

    const { getByText } = render(
      <TestWrapper businessContext={{ businesses: oneBiz }}>
        <List />
      </TestWrapper>
    );
    expect(getByText("Check out this space...")).toBeVisible();
  });

  xit("should render a message if there is more than one result", () => {
    const twoBiz = [
      {
        name: "Spacehop Cafe",
        address_street: "1st Street",
        address_city: "Roppongi",
        address_zip: "777",
        phone: "0123-456-789",
        business_type: "Cafe",
        capacity: 10,
        price: 10000,
      },
      {
        name: "Space Xchange",
        address_street: "2nd Street",
        address_city: "Shibuya",
        address_zip: "777",
        phone: "0123-456-789",
        business_type: "Bar",
        capacity: 20,
        price: 20000,
      }
    ];

    const { getByText } = render(
      <TestWrapper businessContext={{ businesses: twoBiz }}>
        <List />
      </TestWrapper>
    );
    expect(getByText(`Check out these 2 spaces...`)).toBeVisible();
  });
});
