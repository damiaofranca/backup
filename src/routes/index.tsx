import { ResetPassword } from "../pages/public/ResetPassword";
import { Router, Switch } from "react-router-dom";
import NotFound from "../pages/public/NotFound";
import Layout from "../pages/private/_Layout";
import Login from "../pages/public/Login";
import history from "./history";
import Route from "./route";
import api from "../api";

const Routes = () => {
	const tokenUser = JSON.parse(localStorage.getItem("@cpcmsa") as string);
	if (
		tokenUser !== null &&
		tokenUser.token !== undefined &&
		tokenUser.token !== null
	) {
		console.log(`fsadfs`);
		api.defaults.headers.common["Authorization"] = `Bearer ${tokenUser.token}`;
	}

	return (
		<Router history={history}>
			<Switch>
				<Route exact path="/login" component={Login} />
				<Route exact path="/404" component={NotFound} />
				<Route exact path="/reset-password/:token" component={ResetPassword} />
				<Route isPrivate path="/" component={Layout} />
			</Switch>
		</Router>
	);
};

export default Routes;
