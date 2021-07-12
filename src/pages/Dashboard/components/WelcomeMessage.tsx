import React from "react";

const WelcomeMessage = () => {
  const firstName = localStorage.getItem("firstName");
  return (
    <div
      style={{
        minWidth: 1475,
        marginRight: "auto",
        marginLeft: "auto",
        padding: 20,
        color: "white",
        marginTop: 30,
        textAlign: "left",
        backgroundColor: "#3D9681",
        borderRadius: 5,
      }}
    >
      <h4>Hello {firstName}, Welcome Back!</h4>
      <p
        style={{
          marginTop: 5,
          color: "#93edd8",
        }}
      >
        You can quickly access your courses and materials from the dashboard
      </p>
    </div>
  );
};

export default WelcomeMessage;
