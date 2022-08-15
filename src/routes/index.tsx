import React from "react";
import { Router, Switch } from "react-router-dom";

import history from "./history";
import Route from "./route";

import Layout from "../pages/private/_Layout";
import Login from "../pages/public/Login";
import NotFound from "../pages/public/NotFound";
import api from "../api";

const Routes = () => {
	const token = JSON.parse(localStorage.getItem("@cpcmsa") as string).token;
	if (token !== undefined && token !== null) {
		api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	}

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
