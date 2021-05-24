import React from "react";
import Logo from "../../assets/imgs/Logo.png";
import { Link } from "react-router-dom";

export default function Header({ cta = false }) {
  let headerClasses = "toparea";
  if (cta) {
    headerClasses += " extended";
  }
  return (
    <div className={headerClasses}>
      <div className="container">
        <div className="row header">
          <div className="col-6">
            <div className="logo">
              <img src={Logo} alt="Unravel Logo" />
            </div>
          </div>
          <div className="col-6">
            <nav>
              <Link to="/">Home</Link>
              <a href="#">Features</a>
              <a href="#">How it works</a>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </nav>
          </div>
        </div>
        {cta && (
          <div className="row cta">
            <div className="col-12">
              <h1>Bringing AI to remote education</h1>
              <div className="buttons">
                <a href="#" className="button outline">
                  Learn More
                </a>
                <Link to="/register">
                  <a className="button green">Start Now</a>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
