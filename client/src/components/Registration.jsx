import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

function Resisration() {
  return (
    <div className="Resisration">
      <div>
        <div className="container">
          <p>this is resisraiton</p>
          <Form>
            <Row>
              <Col>
                <Form.Group controlId="form_fisrt_name">
                  <Form.Label>first name</Form.Label>
                  <Form.Control type="text" placeholder="Enter first name" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="form_last_name">
                  <Form.Label>last name</Form.Label>
                  <Form.Control type="text" placeholder="Enter last name" />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="form_tell">
              <Form.Label>telephone number</Form.Label>
              <Form.Control type="text" placeholder="Enter tell" />
            </Form.Group>
            <Form.Group controlId="form_email">
              <Form.Label>email</Form.Label>
              <Form.Control type="text" placeholder="Enter Place" />
            </Form.Group>
          </Form>
          <Button variant="success" type="submit">
            Click
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Resisration;
