import React from "react";
import Logo from "../../../assets/imgs/Logo.png";
import { Link } from "react-router-dom";

export default function Header() {
  return(
    <div className="toparea">
    <div className="container">
      <div className="row header">
        <div className="col-6">
          <div className="logo">
            <img src={Logo} alt="Unravel Logo" />
        </div>
        </div>
        <div className="col-6">
          <nav>
            <a href="#">Features</a>
            <a href="#">How it works</a>
            <Link to="/register">Register</Link>
            <a href="#">Login</a>
          </nav>
        </div>
      </div>
      <div className="row cta">
        <div className="col-12">
          <h1>Bringing AI to remote education</h1>
          <div className="buttons">
            <a href="#" className="button outline">Learn More</a>
            <Link to="/register"><a className="button green">Start Now</a></Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}