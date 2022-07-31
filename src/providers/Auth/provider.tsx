import { notification } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import api from "../../api";
import { UserType } from "../../utils/enums";
import { useBreadcrumbs } from "../Breadcrumbs";
import Context from "./context";
import { useHistory } from "react-router-dom";

const PERSIST_KEY = "@cpcmsa";

interface ProviderProps {
	children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
	const history = useHistory();
	const { setBreadcrumbs } = useBreadcrumbs();
	const savedState = JSON.parse(localStorage.getItem(PERSIST_KEY) as string);
	const [state, setState] = useState({
		isAuthenticated: false,
		...savedState,
	});

	const login = useCallback(
		async (email: string, password: string) => {
			try {
				const { data } = await api.post("/auth/login", {
					email,
					password,
				});

				if (data) {
					api.defaults.headers["Authorization"] = `Bearer ${data.access_token}`;

					if (data.franchisee || data.franchisee_id) {
						api.defaults.headers["franchisee_id"] =
							data?.franchisee?.id || data?.franchisee_id;
					}

					const zone = (data?.zones || []).slice().shift();

					setState({
						...state,
						...data,
						isAuthenticated: true,
						...(data.franchisee ? { franchisee_id: data.franchisee.id } : {}),
						...(zone ? { zone_id: zone.id } : {}),
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
		api.defaults.headers["franchisee_id"] = undefined;

		setState({
			isAuthenticated: false,
		});

		if (history) {
			history.replace("/login");
		}
	}, [history, setBreadcrumbs]);

	const hasZones = useCallback(() => {
		return state?.zones?.length > 0;
	}, [state]);

	const selectZone = useCallback(
		(id: any) => {
			return setState({
				...state,
				zone_id: id,
			});
		},
		[state]
	);

	const userTypeIs = useCallback(
		(type: any) => {
			return (
				(Array.isArray(type) ? type : [type]).indexOf(state.user_type) > -1
			);
		},
		[state]
	);

	const passwordIsUpdated = useCallback(() => {
		setState({
			...state,
			must_reset_password: false,
		});
	}, [state]);

	const checkPermission = useCallback(
		(type: any) => {
			return true;
			if (userTypeIs([UserType.Clerk, UserType.Franchisee])) {
				if (hasZones()) {
					return userTypeIs(type);
				}
				return false;
			}
			return userTypeIs(type);
		},
		[hasZones, userTypeIs]
	);

	if (savedState && savedState["access_token"]) {
		api.defaults.headers[
			"Authorization"
		] = `Bearer ${savedState["access_token"]}`;

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
		if (savedState.franchisee || savedState.franchisee_id) {
			api.defaults.headers["franchisee_id"] =
				savedState?.franchisee?.id || savedState.franchisee_id;
		}
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
				userTypeIs,
				checkPermission,
				hasZones,
				selectZone,
				passwordIsUpdated,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export default Provider;
