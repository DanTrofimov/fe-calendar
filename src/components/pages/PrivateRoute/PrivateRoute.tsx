import React, { FC } from "react";
import { Redirect, Route } from "react-router-dom";
import { Routes } from "../../../constants/routes";
import Header from "../../molecules/Header";

type PrivateRouteProps = {
  component: React.ElementType;
  path?: Routes;
};

const PrivateRoute: FC<PrivateRouteProps> = ({
  component: Component,
  ...restProps
}) => {
  const user = {};

  if (user) {
    return <Redirect to={Routes.LOGIN} />;
  }

  return (
    <Route
      {...restProps}
      render={(props) => (
        <>
          <Header />
          <Component {...props} />
        </>
      )}
    />
  );
};

export default PrivateRoute;
