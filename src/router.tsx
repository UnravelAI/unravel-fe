import React, { useState, useEffect, Suspense } from "react";
import { Router, Route, Switch, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import history from "./history";

// Pages
const Home = React.lazy(() => import("./pages/Homepage"));
const Register = React.lazy(() => import("./pages/Register"));
const Login = React.lazy(() => import("./pages/Login"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Material = React.lazy(() => import("./pages/Material"));

const RootRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Loading</div>}>
          <div className="wrapper">
            <ToastContainer />
            <Switch>
              <Route path="/" exact>
                <Home isLoggedIn={isLoggedIn} />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/login">
                <Login setIsLoggedIn={setIsLoggedIn} />
              </Route>
              <Route path="/dashboard">
                <Dashboard isLoggedIn={isLoggedIn} />
              </Route>
              <Route path="/material/:id">
                <Material />
              </Route>
            </Switch>
          </div>
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default RootRouter;
