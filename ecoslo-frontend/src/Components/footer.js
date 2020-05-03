import React from "react";
import "../styles/header.css";
import "../styles/index.css";

const style = {
    'flex-shrink': 0,
    'text-align': 'center',
    'background-color': 'tomato',
    'color': 'white'
  }

const marginstyle={
    'marginTop': '1.2em',
    'marginBottom': '2em'
  }

class Footer extends React.Component {



  render() {
    return (
      <div style={style}>
          <footer>
              <p style={marginstyle}>Made by Hack4Impact Cal Poly</p>
        </footer>
      </div>
    );
  }
}
export default Footer;
