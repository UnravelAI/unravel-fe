import React from "react";
// Page Components
import Header from "../../core/components/Header";
import Features from "./Components/Features";
import HowItWorks from "./Components/HowItWorks";
import Footer from "../../core/components/Footer";

function Homepage() {
  return(
    <>
      <Header cta/>
      <Features />
      <HowItWorks />
      <Footer />
    </>
  );
}

export default Homepage;
