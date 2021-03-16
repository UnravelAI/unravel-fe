import React from "react";
// Page components
import DashboardHeader from "../../core/components/DashboardHeader";
import Footer from "../../core/components/Footer";
import MaterialsContainer from "./components/MaterialsContainer";

const Dashboard = () => {
  return (
    <>
      <DashboardHeader active="Dashboard" />
      <div className="page">
        <MaterialsContainer />
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
