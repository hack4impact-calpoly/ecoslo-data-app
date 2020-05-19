import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { withRouter } from 'react-router-dom';
import "../styles/header.css";
import "../styles/index.css";

const linkToText = {
  "/home" : "Home",
  "/add" : "Add",
  "/view" : "View",
  "/update" : "Update", 
  "/alter" : "Alter"
};

class Header extends React.Component {

  getAppropriateLinkType = (linkName) => {
    const linkAt = this.props.location.pathname || "/home";
    if (linkAt === linkName) {
      return (
        <Navbar.Brand 
          href={linkName}
          key={linkName}
          className="ml-3"
        >
          { linkToText[linkName] }
        </Navbar.Brand>
      );
    }

    return (
      <Nav.Link
        href={linkName}
        key={linkName}
      >
        { linkToText[linkName] }
      </Nav.Link>
    );
  }

  render() {
    return (
      <div >
        <Navbar className="header-strip" variant="dark">
          <img
            src={require("../images/circle-cropped-ecoslo.png")}
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
          <Nav>
            { Object.keys(linkToText).map(this.getAppropriateLinkType) }
          </Nav>
      </Navbar>
      <div></div>
      </div>
    );
  }
}
export default withRouter(Header);
