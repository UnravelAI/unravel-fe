import React from "react";
import Logo from "../../assets/imgs/Logo.png";
import { Link } from "react-router-dom";

export default function Header() {
  return(
    <div className="toparea mini-header">
    <div className="container">
      <div className="row header">
        <div className="col-4">
          <div className="logo">
            <img src={Logo} alt="Unravel Logo" style={{ width: "173px", height: "38px" }}/>
        </div>
        </div>
        <div className="col-8">
          <nav>
            <Link to="/dashboard">Dashboard</Link>
            <a href="#">Courses</a>
            <a href="#">Enrolled Students</a>
            <a href="#">Published Materials</a>
            <a href="#" style={{ color: "white", opacity: 1, backgroundColor: "#a85e5e", padding: "10px" }}>Logout</a>
          </nav>
        </div>
      </div>
    </div>
  </div>
  );
}