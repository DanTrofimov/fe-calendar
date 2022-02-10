import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Routes } from "./constants/routes";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";

function App() {
  return (
    <Router>
      <Switch>
        <Route path={Routes.LOGIN} component={Login} />
        <Route path={Routes.SIGN_UP} component={SignUp} />
      </Switch>
    </Router>
  );
}

export default App;
