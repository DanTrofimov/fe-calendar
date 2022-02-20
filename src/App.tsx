import React from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import {Provider} from "react-redux";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Routes} from "./constants/routes";
import {ToastsConfig} from "./constants/toast";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import Dashboard from "./components/pages/Dashboard";
import EventListRequests from "./components/pages/EventListRequests"
import EventListScheduled from "./components/pages/EventListScheduled"
import PrivateRoute from "./components/pages/PrivateRoute/PrivateRoute"
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <ToastContainer {...ToastsConfig} />
      <Router>
        <Switch>
          <Route path={Routes.LOGIN} component={Login}/>
          <Route path={Routes.SIGN_UP} component={SignUp}/>
          <Route path={Routes.DASHBOARD} component={Dashboard}/>
          <Route path={Routes.REQUESTS}>
            <PrivateRoute
              component={EventListRequests}
            />
          </Route>
          <Route path={Routes.SCHEDULED}>
            <PrivateRoute
              component={EventListScheduled}
            />
          </Route>
          <Redirect from="/" to={Routes.DASHBOARD}/>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
