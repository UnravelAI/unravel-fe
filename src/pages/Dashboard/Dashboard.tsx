import React from "react";
// Page components
import DashboardHeader from "../../core/components/DashboardHeader";
import Footer from "../../core/components/Footer";
import MaterialsContainer from "./components/MaterialsContainer";
import { Redirect } from "react-router-dom";

const Dashboard = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <DashboardHeader active="Dashboard" />
      <div className="page">
        <MaterialsContainer />
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
