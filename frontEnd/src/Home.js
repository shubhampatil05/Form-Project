import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="Home">
      <h1>Select Your Insurance Type..</h1>
      <Link className="btn btn-warning text-bg-danger" to="/Personal">
        Personal
      </Link>
      <Link className="btn btn-info text-bg-dark" to="/Commercial">
        Commercial
      </Link>
    </div>
  );
};

export default Home;
