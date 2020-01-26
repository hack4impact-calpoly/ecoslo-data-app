import React from "react";
import Button from "react-bootstrap/Button";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Redirect} from 'react-router-dom';
import "../styles/header.css";
import "../styles/index.css";


class Header extends React.Component {

    render(){
        return(
            <body>
            <Navbar className="header-strip" variant="dark">
            <img
              src={require("../images/circle-cropped-ecoslo.png")}
              width="40"
              height="40"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
            <Nav>
              <Navbar.Brand href="/home" className = "ml-3">Home</Navbar.Brand>
              <Nav>
              <Nav.Link href="/add">Add</Nav.Link>
              <Nav.Link href="/view">View</Nav.Link>
              <Nav.Link href="/update">Update</Nav.Link>
              </Nav>
            </Nav>
          </Navbar>
          </body> 
        )

    }
}
export default Header;
