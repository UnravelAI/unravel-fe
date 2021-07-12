import React from "react";
// Page components
import StudentHeader from "../../core/components/StudentHeader";
import Footer from "../../core/components/Footer";
import WelcomeMessage from "./components/WelcomeMessage";
import StudentMaterialsContainer from "./components/StudentMaterialsContainer";
import { Redirect } from "react-router-dom";

const StudentDashboard = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <StudentHeader active="Dashboard" />
      <WelcomeMessage />
      <div className="page">
        <StudentMaterialsContainer />
      </div>
      <Footer />
    </>
  );
};

export default StudentDashboard;
