import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Col, Row } from "react-bootstrap"; 
import Table from "react-bootstrap/Table";

class View extends React.Component {
  render() {
    return (
      <div>
        <Container>
          <Form>
          <Form.Group controlId="formBasicEmail">
            <Row>
              <Col>
                <Form.Label>Date</Form.Label>
              </Col>
            </Row>
            <Row>  
                <Col sm={6} md={5}>
                  <Form.Control placeholder="Enter Start Date" />
                </Col>
                <Col xs={1}>
                  <div>to</div>
                </Col>
                <Col sm={6} md={5}>
                  <Form.Control placeholder="Enter End Date" />
                </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Location</Form.Label>
                <Form.Control as="select">
                  <option>Choose...</option>
                </Form.Control> 
              </Col> 
            </Row>
            </Form.Group>
          </Form>
        
        <Table responsive="sm">
          <thead>
            <tr>
              <th>Group</th>
              <th>Location</th>
              <th>Date</th>
              <th>Contact</th>
              <th># of Volunteers - Adult</th>
              <th># of Volunteers - Child</th>
              <th>Total # of Volunteers</th>
              <th>Total Weight of Trash (lb)</th>
              <th>Total Weight of Recycle (lb)</th>
              <th>Total Weight (lb)</th>
              <th>Trash Bags Filled</th>
              <th>Distance Covered</th>
              <th>Unusual Items</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>SLO County Public Works</td>
              <td>Cayucos Pier</td>
              <td>3/23/2019</td>
              <td>Annie Secrest</td>
              <td>34</td>
              <td>12</td>
              <td>46</td>
              <td>172</td>
              <td>5</td>
              <td>179</td>
              <td>12</td>
              <td>2</td>
              <td></td> 
            </tr>
            <tr>
              <td>Cal Poly Career Services</td>
              <td>Morro Rock</td>
              <td>3/25/2019</td>
              <td>Krista Burke</td>
              <td>14</td>
              <td>0</td>
              <td>14</td>
              <td>15</td>
              <td>2</td>
              <td>17</td>
              <td>8</td>
              <td>2</td>
              <td>bandaid, clothes/fabric</td>
            </tr>
            <tr>
              <td>ECOSLO</td>
              <td>Morro Strand South @ HWY 141</td>
              <td>4/6/2019</td>
              <td>Kayla</td>
              <td>51</td>
              <td>3</td>
              <td>4</td>
              <td>54</td>
              <td>7</td>
              <td>61</td>
              <td>11</td>
              <td>2</td>
              <td></td>
            </tr>
            </tbody>
          </Table>
          
        </Container>
      </div>
    );
  }
}

export default View;