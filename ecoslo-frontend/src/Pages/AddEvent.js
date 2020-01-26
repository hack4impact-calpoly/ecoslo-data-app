import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {Row, Col} from 'react-bootstrap';

class AddEvent extends React.Component {
  render() {
    return (
      <div>
        <Container>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Date</Form.Label>
              <Form.Control placeholder="Enter Date" />
              <Form.Label>Location</Form.Label>
              <Form.Control as="select">
              <option>Choose...</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Row>
                <Col>
                  <Form.Label>Cigarette Butts</Form.Label>
                </Col>
                <Col>
                  <Form.Control/>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Cig</Form.Label>
                </Col>
                <Col>
                  <Form.Control/>
                </Col>
              </Row>
              <Form.Label>Plastic Lids</Form.Label>
              <Form.Control/>
              <Form.Label>Straws/Stirrers</Form.Label>
              <Form.Control/>
              <Form.Label>Forks, Knives, Spoons</Form.Label>
              <Form.Control/>
              <Form.Label>Grocery Bags</Form.Label>
              <Form.Control/>
            </Form.Group>
          </Form>
        </Container>
      </div>
    );
  }
}

export default AddEvent;