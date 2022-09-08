import { notification } from "antd";
import React, {
	PropsWithChildren,
	useCallback,
	useEffect,
	useState,
} from "react";
import { useHistory } from "react-router-dom";
import api from "../../api";
import { useBreadcrumbs } from "../Breadcrumbs";
import Context from "./context";
import { LoggedUser, StateUser } from "./props";

const PERSIST_KEY = "@cpcmsa";

const CLEAN_UP_USER: LoggedUser = {
	admin: false,
	email: "",
	token: "",
	perms: [],
	name: "",
};

interface ProviderProps {}

const SAVED_STATE = JSON.parse(localStorage.getItem(PERSIST_KEY) as string);

const Provider: React.FC<PropsWithChildren<ProviderProps>> = ({ children }) => {
	const history = useHistory();

	const { setBreadcrumbs } = useBreadcrumbs();

	const [state, setState] = useState<StateUser>({
		isAuthenticated: false,
		...SAVED_STATE,
	});

	const login = useCallback(
		async (email: string, password: string) => {
			try {
				const { data } = await api.post("crm/auth/login", {
					email: email,
					password: password,
				});
				if (data) {
					api.defaults.headers["Authorization"] = `Bearer ${data.token}`;
					setState({
						...state,
						...data,
						isAuthenticated: true,
					});
				}
			} catch (error) {
				throw new Error("Erro ao fazer o login! " + error);
			}
		},
		[state]
	);

	const logout = useCallback(() => {
		setBreadcrumbs([]);
		localStorage.removeItem(PERSIST_KEY);
		api.defaults.headers["Authorization"] = undefined;
		setState({
			...CLEAN_UP_USER,
			isAuthenticated: false,
		});

		if (history) {
			history.replace("/login");
		}
	}, [history, setBreadcrumbs]);

	const userIsAdmin = useCallback(() => {
		return !!state.admin;
	}, [state]);

	if (SAVED_STATE && SAVED_STATE["access_token"]) {
		api.defaults.headers[
			"Authorization"
		] = `Bearer ${SAVED_STATE["access_token"]}`;
		api.interceptors.response.use(
			(response: any) => {
				return response;
			},
			(error: any) => {
				if (error.response || typeof error === "object") {
					if (error?.response?.status === 401) {
						logout();
						return Promise.reject("Unauthorized");
					}

					if (error?.response?.data?.message) {
						notification.error({
							message: "Erro",
							description: error.response.data.message,
						});
					}

					if (error?.response?.data?.error) {
						notification.error({
							message: "Erro",
							description: error.response.data.message,
						});
					}

					if (error?.response?.data?.errors) {
						error.response.data.errors.forEach((erro: any) => {
							notification.error({
								message: "Erro",
								description: erro,
							});
						});
					}

					if (error?.data?.message) {
						notification.error({
							message: "Erro",
							description: error.data.message,
						});
					}

					if (error?.data?.error) {
						notification.error({
							message: "Erro",
							description: error.data.message,
						});
					}

					if (error?.data?.errors) {
						error.data.errors.forEach((erro: any) => {
							notification.error({
								message: "Erro",
								description: erro,
							});
						});
					}
				}

				return Promise.reject(new Error(error));
			}
		);
	}

	useEffect(() => {
		try {
			localStorage.setItem(PERSIST_KEY, JSON.stringify(state));
		} catch (error) {
			console.warn(error);
		}
	}, [state, logout]);

	return (
		<Context.Provider
			value={{
				...state,
				login,
				logout,
				userIsAdmin,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export default Provider;
