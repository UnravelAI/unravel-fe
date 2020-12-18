import React, {Suspense} from "react";
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

// Pages
const Home = React.lazy(() => import("./pages/Homepage"));
const Register = React.lazy(() => import("./pages/Register"));

const Router = () => {
  return(
    <BrowserRouter>
      <Switch>
        <Suspense fallback={<div>Loading</div>}>
          <div className="wrapper">
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
          </div>
        </Suspense>
      </Switch>
    </BrowserRouter>
  );  
}

export default Router;