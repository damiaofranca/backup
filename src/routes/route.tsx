import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAuth } from "../providers/Auth";

interface RouterProp extends RouteProps {
  component: any;
  isPrivate?: boolean;
}

const Router: React.FC<RouterProp> = ({ component: Component, isPrivate = false, ...rest }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated && isPrivate) {
    return <Redirect to="/login" />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default Router;
