import React from "react";
import Logo from "../../assets/imgs/Logo.png";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function Header({ active }: { active: string }) {
  const history = useHistory();
  return (
    <div className="toparea mini-header">
      <div className="container">
        <div className="row header">
          <div className="col-4">
            <div className="logo">
              <img
                src={Logo}
                alt="Unravel Logo"
                style={{ width: "173px", height: "38px" }}
              />
            </div>
          </div>
          <div className="col-8" style={{ textAlign: "right" }}>
            <nav>
              <Link
                style={{ opacity: active === "Dashboard" ? 1 : 0.4 }}
                to="/student/dashboard"
              >
                Dashboard
              </Link>
              <a
                href="#"
                style={{
                  color: "white",
                  opacity: 1,
                  backgroundColor: "#bf3434",
                  padding: "5px 10px",
                  borderRadius: 5,
                }}
                onClick={() => {
                  localStorage.removeItem("accessToken");
                  localStorage.removeItem("isTeacher");
                  history.push("/login");
                }}
              >
                Logout
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
