import React from "react";
// Assets
import RegisterVector from "../../assets/imgs/registeration.png";
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
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
