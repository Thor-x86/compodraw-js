import React from "react";
import { Link } from "react-router-dom";

const divStyles = {
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "32vh",
  width: "fit-content",
};

const ulStyles = {
  paddingLeft: "24px",
};

function Home() {
  return (
    <div style={divStyles}>
      <h1>Pick compose method:</h1>
      <ul style={ulStyles}>
        <li>
          <h2>
            <Link to="/plain_jsx">with Plain JSX</Link>
          </h2>
        </li>
        <li>
          <h2>
            <Link to="/class_jsx">with Class JSX</Link>
          </h2>
        </li>
        <li>
          <h2>
            <Link to="/xml">with XML</Link>
          </h2>
        </li>
        <li>
          <h2>
            <Link to="/dom">with DOM</Link>
          </h2>
        </li>
      </ul>
    </div>
  );
}

export default Home;
