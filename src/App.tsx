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
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <ToastContainer {...ToastsConfig} />
      <Router>
        <Switch>
          <Route path={Routes.LOGIN} component={Login} />
          <Route path={Routes.SIGN_UP} component={SignUp} />
          <Redirect from="/" to={Routes.LOGIN} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
