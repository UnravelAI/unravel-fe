import React from "react";
// Page components
import DashboardHeader from "../../core/components/DashboardHeader";
import Footer from "../../core/components/Footer";
import StudentMaterialsContainer from "./components/StudentMaterialsContainer";
import { Redirect } from "react-router-dom";

const StudentDashboard = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <DashboardHeader active="Dashboard" />
      <div className="page">
        <StudentMaterialsContainer />
      </div>
      <Footer />
    </>
  );
};

export default StudentDashboard;
