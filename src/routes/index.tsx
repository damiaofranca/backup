import React from "react";
import { Router, Switch } from "react-router-dom";

import history from "./history";
import Route from "./route";

import Layout from "../pages/private/_Layout";
import Login from "../pages/public/Login";
import NotFound from "../pages/public/NotFound";

const Routes = () => {
	return (
		<Router history={history}>
			<Switch>
				<Route exact path="/login" component={Login} />
				<Route exact path="/404" component={NotFound} />
				<Route isPrivate path="/" component={Layout} />
			</Switch>
		</Router>
	);
};

export default Routes;
