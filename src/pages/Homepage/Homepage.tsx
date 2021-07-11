import React, { useEffect } from "react";
// Page Components
import Header from "../../core/components/Header";
import Features from "./Components/Features";
import HowItWorks from "./Components/HowItWorks";
import Footer from "../../core/components/Footer";
import {
  Redirect
} from "react-router-dom";

function Homepage({ isLoggedIn }: { isLoggedIn: boolean }) {
  if (isLoggedIn) {
    const isTeacher = localStorage.getItem("isTeacher");
    if (isTeacher) {
      return <Redirect to="/dashboard" />
    }
    return (
      <Redirect to="/student/dashboard" />
    );
  }
  return (
    <>
      <Header cta />
      <Features />
      <HowItWorks />
      <Footer />
    </>
  );
}

export default Homepage;
