import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Routes } from "./constants/routes";
import Login from "./components/pages/Login";

function App() {
  return (
    <Router>
      <Switch>
        <Route path={Routes.LOGIN} component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
