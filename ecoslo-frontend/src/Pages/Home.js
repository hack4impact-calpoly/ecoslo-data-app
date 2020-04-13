
import React from "react";
import "../styles/home.css";
import "../styles/index.css";
import { Form } from "react-bootstrap";

class Home extends React.Component {
    render() {
        return (
            <div>
                <div id="home-page" className="page">
                
                    <div style={{height: "20%"}} />
                    <div className="centered">
                        <img style={{transform: "scale(1.3)", margin: "2% 0"}} src={require("../images/ECOSLO_logo.png")} alt="Eco SLO" />
                    </div>
                    <div className="center-strip">
                        <span className="upper">Cleanup Database</span>
                    </div>
                    <div style={{height: "25%"}} />
                    <div className="home-buttons">
                        <a href="/add" className="home-button upper">Add</a>
                        <a href="/update" className="home-button upper">Update</a>
                        <a href="/view" className="home-button upper">View</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;