import React from "react";
// Page Components
import Header from "./Components/Header";
import Features from "./Components/Features";
import HowItWorks from "./Components/HowItWorks";
import Footer from "../../core/components/Footer";

function Homepage() {
  return(
    <>
      <Header />
      <Features />
      <HowItWorks />
      <Footer />
    </>
  );
}

export default Homepage;
