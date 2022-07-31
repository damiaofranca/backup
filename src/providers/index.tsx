import React from "react";
import { ConfigProvider } from "antd";
import ptBR from "antd/lib/locale/pt_BR";

import AuthProvider from "./Auth";
import BreadcrumbsProvider from "./Breadcrumbs";

const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return (
		<ConfigProvider locale={ptBR}>
			<BreadcrumbsProvider>
				<AuthProvider>{children}</AuthProvider>
			</BreadcrumbsProvider>
		</ConfigProvider>
	);
};

export default GlobalProvider;
