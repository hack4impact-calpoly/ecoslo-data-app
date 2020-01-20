import React, { Component } from "react";
import '../styles/Home.css';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'reactstrap';

class Home extends Component {

  render() {
    return (
      <div>
        <h2>Home page!</h2>
        <div className="text-center">
        <Container>
        <Row>
          <Col><Button variant="secondary" size="lg" xs={100} md={4}>ADD</Button></Col>
          <Col><Button variant="secondary" size="lg" xs={100} md={4}>UPDATE</Button></Col>
          <Col><Button variant="secondary" size="lg" xs={100} md={4}>VIEW</Button></Col>
        </Row>
      </Container>
        </div>
      </div>
    );
  }
}

export default Home;
