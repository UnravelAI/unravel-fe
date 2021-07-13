import React from "react";
// Page components
import DashboardHeader from "../../core/components/DashboardHeader";
import Footer from "../../core/components/Footer";
import MaterialsContainer from "./components/MaterialsContainer";
import WelcomeMessage from "./components/WelcomeMessage";
import { Redirect } from "react-router-dom";

const Dashboard = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  if (localStorage.getItem("isTeacher") === "false") {
    return <Redirect to="/student/dashboard" />;
  }
  return (
    <>
      <DashboardHeader active="Dashboard" />
      <WelcomeMessage />
      <div className="page">
        <MaterialsContainer />
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
