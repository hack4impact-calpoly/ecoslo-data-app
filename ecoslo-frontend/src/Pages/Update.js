import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

class Update extends React.Component {
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
        </Form>
        </Container>
      </div>
    );
  }
}

export default Update;