import React from "react";
// Assets
import EmptyProjectsVector from "../../assets/imgs/emptyProjects.png";
// Page components
import DashboardHeader from "../../core/components/DashboardHeader";
import Footer from "../../core/components/Footer";
//import { useHistory } from "react-router-dom";

const Dashboard = () => {
  return(
    <>
      <DashboardHeader />
      <div className="page">
        <div className="container">
          <div style={{ textAlign: "center" }}>
            <img src={EmptyProjectsVector} alt="You don't have any materials"/>
            <h4 style={{ marginTop: "25px", color: "#a6a6a6" }}>You don't have any materials yet!</h4>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
