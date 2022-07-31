import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { CheckPermArg, useAuth } from "../providers/Auth";

interface RouterProp extends RouteProps {
  component: any;

  userType?: CheckPermArg;
  isPrivate?: boolean;
}

const Router: React.FC<RouterProp> = ({
  component: Component,
  userType,
  isPrivate = false,
  ...rest
}) => {
  const { isAuthenticated, checkPermission } = useAuth();

  if (!isAuthenticated && isPrivate) {
    return <Redirect to="/login" />;
  }

  if ((userType) && (!checkPermission(userType))) {
    return <Redirect to="/404" />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default Router;
