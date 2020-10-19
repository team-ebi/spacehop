import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
const axios = require("axios");

function Registration() {
  //state of first name
  const [firstName, setFirstName] = useState("");
  //state of last name
  const [lastName, setLastName] = useState("");
  //state of telephone number
  const [telephoneNumber, setTelephonenumber] = useState("");
  //state of email
  const [email, setEmail] = useState("");

  const baseUrl = `${process.env.REACT_APP_BACKEND_URL} || "http://localhost:4000"`

  //get first name by onchange
  function getFirstName(e) {
    setFirstName(e.target.value);
  }
  // console.log(firstName);
  //get last name by onchange
  function getLastName(e) {
    setLastName(e.target.value);
  }
  // console.log(lastName);
  //get telephone number by onchange
  function getTelephoneNumber(e) {
    setTelephonenumber(e.target.value);
  }
  // console.log(telephoneNumber);
  //get email by onchange
  function getEmail(e) {
    setEmail(e.target.value);
  }
  // console.log(email);
  //submit data by cliking the button
  //now, just console log
  async function submitData() {
    // console.log(firstName);
    // console.log(lastName);
    // console.log(telephoneNumber);
    // console.log(email);
    // await axios.post(`${baseUrl}http://localhost:3000/someapi`, {
    //   first_name: firstName,
    //   last_name: lastName,
    //   telephone_Number: telephoneNumber,
    //   e_mail: email,
    // });
  }

  return (
    <div className="Registrasion">
      <div>
        <div className="container" style={{ padding: "40px 30px" }}>
          <h2
            style={{
              padding: "10px 10px",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            Registration Form
          </h2>
          <Form>
            <Row>
              <Col>
                <Form.Group controlId="form_fisrt_name">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First name"
                    onChange={getFirstName}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="form_last_name">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Last name"
                    onChange={getLastName}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="form_tell">
              <Form.Label>Telephone number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Telephone number"
                onChange={getTelephoneNumber}
              />
            </Form.Group>
            <Form.Group controlId="form_email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
                onChange={getEmail}
              />
            </Form.Group>
          </Form>
          <div className="button_layout" style={{ margin: "30px 0px " }}>
            <Button
              variant="success"
              type="submit"
              size="lg"
              block
              onClick={submitData}
            >
              Click
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
