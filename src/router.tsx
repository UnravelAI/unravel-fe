import React, { useState, useEffect, Suspense } from "react";
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Pages
const Home = React.lazy(() => import("./pages/Homepage"));
const Register = React.lazy(() => import("./pages/Register"));
const Login = React.lazy(() => import("./pages/Login"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Material = React.lazy(() => import("./pages/Material"));

const PrivateRoute = ({ ...rest }) => {
  return (
    <Route {...rest} />
  );
}

const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Suspense fallback={<div>Loading</div>}>
            <div className="wrapper">
              <ToastContainer />
              <Route path="/" exact>
                <Home isLoggedIn={isLoggedIn} />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/dashboard">
                <Dashboard isLoggedIn={isLoggedIn} />
              </Route>
              <Route path="/material/:id/:title">
                <Material />
              </Route>
            </div>
          </Suspense>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default Router;