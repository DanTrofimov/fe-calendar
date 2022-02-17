import React, {FC} from "react";
import {Redirect, Route} from "react-router-dom";
import {useSelector} from "react-redux";
import {Routes} from "../../../constants/routes";
import {User} from "../../../domain";
import {selectUser} from "../../../store/user/selectors";

type PrivateRouteProps = {
  component: React.ElementType;
  path?: Routes;
};

const PrivateRoute: FC<PrivateRouteProps> = ({
                                               component: Component,
                                               ...restProps
                                             }) => {

  const user: User | null = useSelector(selectUser);

  if (!user) {
    return <Redirect to={Routes.LOGIN}/>;
  }

  return (
    <Route
      {...restProps}
      render={(props) => (
        <Component {...props} />
      )}
    />
  );
};

export default PrivateRoute;
