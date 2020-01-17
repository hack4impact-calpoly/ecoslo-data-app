import React, { Component } from "react";
import '../styles/Home.css';
import Button from 'react-bootstrap/Button';

class Home extends Component {

  render() {
    return (
      <div>
        <h2>Home page!</h2>
        <div>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="success">Success</Button>
        </div>
      </div>
    );
  }
}

export default Home;
