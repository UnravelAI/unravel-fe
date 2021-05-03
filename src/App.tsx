import React, { useEffect } from 'react';
import './assets/css/Reset.css';
import './assets/css/bootstrap-grid.min.css';
import './assets/css/UI.css';
import './assets/css/App.css';
import Router from "./router";
import { authInterceptor } from "./axios";

function App() {
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      console.log("activated");
      authInterceptor.activate();
    }
  }, []);
  return (
    <Router />
  );
}

export default App;
