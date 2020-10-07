import React from "react";
import { Button, Container, Row, Col, Image } from "react-bootstrap";
import personImg from "../img/personal-2.jpg";

function Profile() {
  return (
    <div className="Profile">
      <p>this is profile</p>
      <div className="container">
        <Container>
          <Row>
            <Image src={personImg} rounded />
          </Row>
          <Row>
            <h4>hello I'm bra bra bra ....</h4>
          </Row>
          <Row>
            <h2>name</h2>
          </Row>
          <Row>
            <h2>telephone number</h2>
          </Row>
          <Row>
            <h2>email</h2>
          </Row>
          <Row>
            <h1>here is the feature</h1>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Profile;
