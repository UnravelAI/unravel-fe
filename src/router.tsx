import React, {Suspense} from "react";
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

// Pages
const Home = React.lazy(() => import("./pages/Homepage"));

const Router = () => {
  return(
    <BrowserRouter>
      <Switch>
        <Suspense fallback={<div>Loading</div>}>
          <Route path="/">
            <Home />
          </Route>
        </Suspense>
      </Switch>
    </BrowserRouter>
  );  
}

export default Router;