
import React from "react";
import "../styles/home.css";
import "../styles/index.css";
import Header from "../Components/header.js";

class Home extends React.Component {
    render() {
        return (
            <div>
            <Header></Header>
            <div id="home-page" className="page">
                <div style={{height: "20%"}} />
                <div className="centered">
                    <img style={{transform: "scale(1.3)", margin: "2% 0"}} src={require("../images/ECOSLO_logo.png")} alt="Eco SLO" />
                </div>
                <div className="center-strip">
                    <span className="upper">Beach Cleanup Database</span>
                </div>
                <div style={{height: "25%"}} />
                <div className="home-buttons">
                    <button className="home-button upper">Add</button>
                    <button className="home-button upper">Update</button>
                    <button className="home-button upper">View</button>
                </div>
            </div>
            </div>
        );
    }
}

export default Home;