import React from "react";
import "../styles/home.css";
import "../styles/index.css";

class Home extends React.Component {
    render() {
        return (
            <div className="page">
                <div className="center-strip">
                    <span className="upper">Beach Cleanup SLO</span>
                </div>
                <div className="home-buttons">
                    <button className="home-button upper">Add</button>
                    <button className="home-button upper">Update</button>
                    <button className="home-button upper">View</button>
                </div>
            </div>
        );
    }
}

export default Home;
