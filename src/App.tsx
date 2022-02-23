import React from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes } from "./constants/routes";
import { ToastsConfig } from "./constants/toast";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import Dashboard from "./components/pages/Dashboard";
import EventListRequests from "./components/pages/EventListRequests";
import EventListScheduled from "./components/pages/EventListScheduled";
import PrivateRoute from "./components/pages/PrivateRoute/PrivateRoute";
import store from "./store";
import withAuthWrapper from "./components/hocs/withAuth";
import { Roles } from "./domain";

function App() {
  return (
    <Provider store={store}>
      <ToastContainer {...ToastsConfig} />
      <Router>
        <Switch>
          <Route
            path={Routes.LOGIN}
            render={(props) => withAuthWrapper(Login, props)}
          />
          <Route
            path={Routes.SIGN_UP}
            render={(props) => withAuthWrapper(SignUp, props)}
          />
          <Route
            path={Routes.DASHBOARD}
            render={(props) => withAuthWrapper(Dashboard, props)}
          />
          <PrivateRoute
            path={Routes.REQUESTS}
            access={Roles.ADMIN}
            component={EventListRequests}
          />
          <PrivateRoute
            access={Roles.USER}
            path={Routes.SCHEDULED}
            component={EventListScheduled}
          />
          <Redirect from="/" to={Routes.DASHBOARD} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
