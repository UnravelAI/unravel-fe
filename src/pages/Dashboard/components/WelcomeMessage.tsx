import React from "react";

const WelcomeMessage = () => {
  const firstName = localStorage.getItem("firstName");
  return (
    <div
      style={{
        minWidth: 1500,
        marginRight: "auto",
        marginLeft: "auto",
        padding: 20,
        color: "white",
        marginTop: 30,
        textAlign: "left",
        backgroundColor: "#3D9681",
      }}
    >
      <h4>Hello {firstName}, Welcome Back!</h4>
    </div>
  );
};

export default WelcomeMessage;
