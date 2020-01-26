import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table'

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
        
        <Table responsive bordered>
          <thead>
            <tr>
              <th>Group</th>
              <th>Location</th>
              <th>Date</th>
              <th>Total Weight of Trash (lb)</th>
              <th>Total Weight of Recycle (lb)</th>
              <th>Total Weight</th>
              <th>Trash Bags Filled</th>
              <th>Cigarette Butts</th>
              <th>Food Wrappers</th>

            </tr>
          </thead>
          <tbody>
            <tr>
              <td>SLO County Public Works Dept</td>
              <td>Cayucos Pier</td>
              <td>3/23/2019</td>
              <td>172</td>
              <td>5</td>
              <td>179</td>
              <td>12</td>
              <td>247</td>
              <td>90</td>
            </tr>
            <tr>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
            </tr>
            <tr>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
            </tr>
          </tbody>
        </Table>

        <Form.Label>Item</Form.Label>
        <Form.Control as="select">
        <option>Choose...</option>
        </Form.Control>

        <Form.Label>Number</Form.Label>
        <Form.Control placeholder="Enter number" />

        </Form.Group>
        </Form>
        </Container>
      </div>
    );
  }
}

export default Update;