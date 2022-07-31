import {
	ApartmentOutlined,
	DashboardOutlined,
	EnvironmentOutlined,
	ExclamationCircleOutlined,
	FileDoneOutlined,
	FileOutlined,
	LogoutOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	MobileOutlined,
	ProfileOutlined,
	PushpinOutlined,
	ShoppingCartOutlined,
	ShoppingOutlined,
	StockOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Button, Col, Layout, Menu, Modal, notification, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Switch, useHistory, useLocation } from "react-router-dom";
import logoImage from "../../../assets/logo.svg";
import ChangeUserPassword from "../../../components/ChangeUserPassword";
import { useAuth } from "../../../providers/Auth";
import { CheckPermArg } from "../../../providers/Auth";
import Router from "../../../routes/route";
import { UserType } from "../../../utils/enums";
import Home from "../Home";
import { Container } from "./styles";

const { Header, Content, Sider } = Layout;

const _Layout = () => {
	const { pathname } = useLocation();
	const {
		logout,
		checkPermission,
		hasZones,
		userTypeIs,
		// zones,
		// selectZone,
		// zone_id,
		// name:franchisseeName
	} = useAuth();
	const history = useHistory();
	const [expanded, setExpanded] = useState(true);

	const handleToggleMenu = () => {
		setExpanded(!expanded);
	};

	const buildMenu = (userType: CheckPermArg, children: any) =>
		checkPermission(userType) ? children : null;

	const handleOnClickMenuItem = (e: any) => {
		history.push((e.key || "").startsWith("/") ? e.key : `/${e.key}`);
	};

	const showConfirmLogout = () => {
		Modal.confirm({
			title: "Logout",
			icon: <ExclamationCircleOutlined />,
			content: "Realmente quer fazer logout do sistema?",
			okText: `Sim`,
			onOk() {
				logout();
			},
			onCancel() {},
		});
	};

	useEffect(() => {
		let didCancel = false;

		if (
			!didCancel &&
			userTypeIs([UserType.Clerk, UserType.Franchisee]) &&
			!hasZones()
		) {
			notification.warning({
				message: "Esta franquia não possue zonas!",
			});
		}

		return () => {
			didCancel = true;
		};
	}, [hasZones, userTypeIs]);

	return (
		<Container>
			<ChangeUserPassword />

			<Container>
				<Sider
					trigger={null}
					collapsible
					collapsed={
						userTypeIs([UserType.Clerk, UserType.Franchisee]) && !hasZones()
							? true
							: !expanded
					}
					theme="light"
					breakpoint="lg"
					collapsedWidth="0"
					style={{
						overflow: "auto",
						height: "100vh",
					}}
				>
					<div className="logo">
						<img src={logoImage} alt="Brisanet" />
					</div>
					<div className="system-name">Vendas Digitais</div>
					<Menu
						theme="light"
						mode="inline"
						defaultSelectedKeys={[pathname.split("/")[1]]}
						onClick={handleOnClickMenuItem}
					>
						{buildMenu(
							[UserType.Admin, UserType.Clerk, UserType.Franchisee],
							<Menu.Item key="/" icon={<DashboardOutlined />}>
								Dashboard
							</Menu.Item>
						)}

						{buildMenu(
							UserType.Admin,
							<Menu.Item key="franchises" icon={<ShoppingCartOutlined />}>
								Franquias
							</Menu.Item>
						)}

						{buildMenu(
							UserType.Admin,
							<Menu.Item key="products" icon={<ProfileOutlined />}>
								Produtos
							</Menu.Item>
						)}

						{buildMenu(
							UserType.Admin,
							<Menu.Item key="pages" icon={<FileOutlined />}>
								Páginas
							</Menu.Item>
						)}

						{buildMenu(
							UserType.Admin,
							<Menu.Item key="combos-template" icon={<ApartmentOutlined />}>
								Template de combo
							</Menu.Item>
						)}

						{buildMenu(
							UserType.Admin,
							<Menu.Item key="cities" icon={<PushpinOutlined />}>
								Cidades
							</Menu.Item>
						)}
						{buildMenu(
							UserType.Admin,
							<Menu.Item key="departments" icon={<FileOutlined />}>
								Setores
							</Menu.Item>
						)}

						{buildMenu(
							UserType.Admin,
							<Menu.Item key="users" icon={<UserOutlined />}>
								Usuários
							</Menu.Item>
						)}

						{buildMenu(
							UserType.Admin,
							<Menu.Item key="digital-services" icon={<MobileOutlined />}>
								Serviços digitais
							</Menu.Item>
						)}

						{buildMenu(
							UserType.Admin,
							<Menu.Item key="regulations" icon={<FileDoneOutlined />}>
								Regulamentos
							</Menu.Item>
						)}

						{buildMenu(
							UserType.Admin,
							<Menu.Item key="franchisor-lead" icon={<ShoppingOutlined />}>
								Leads
							</Menu.Item>
						)}

						{buildMenu(
							UserType.Franchisee,
							<Menu.Item key="my-franchisee" icon={<ShoppingCartOutlined />}>
								Minha Franquia
							</Menu.Item>
						)}

						{buildMenu(
							[UserType.Franchisee, UserType.Clerk],
							<Menu.Item key="franchisee-lead" icon={<ShoppingOutlined />}>
								Leads
							</Menu.Item>
						)}

						{buildMenu(
							[UserType.Franchisee],
							<Menu.Item key="report-franchisee-lead" icon={<StockOutlined />}>
								Relatório de leads
							</Menu.Item>
						)}

						{buildMenu(
							[UserType.Franchisee, UserType.Clerk],
							<Menu.Item key="return-schedule" icon={<ShoppingOutlined />}>
								Agendamentos de Retorno
							</Menu.Item>
						)}

						{buildMenu(
							UserType.Franchisee,
							<Menu.Item key="report-return-schedule" icon={<StockOutlined />}>
								Relatório dos agendamentos de retorno
							</Menu.Item>
						)}

						{buildMenu(
							UserType.Franchisee,
							<Menu.Item key="franchisee-clerks" icon={<UserOutlined />}>
								Atendentes
							</Menu.Item>
						)}

						{buildMenu(
							UserType.Franchisee,
							<Menu.Item key="franchisee-zones" icon={<EnvironmentOutlined />}>
								Zonas
							</Menu.Item>
						)}

						{buildMenu(
							UserType.Admin,
							<Menu.Item key="report-be-franchisee" icon={<StockOutlined />}>
								Relatório de leads
							</Menu.Item>
						)}

						{buildMenu(
							UserType.Admin,
							<Menu.Item key="report-franchisee" icon={<StockOutlined />}>
								Relatório de franquias
							</Menu.Item>
						)}
					</Menu>
				</Sider>
				<Layout>
					<Header
						style={{
							padding: 0,
							background: "#fff",
						}}
					>
						<Row style={{ width: "100%" }}>
							<Col
								md={1}
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<div>
									{buildMenu(
										[UserType.Clerk, UserType.Franchisee, UserType.Admin],
										<>
											{!expanded ? (
												<MenuUnfoldOutlined
													className="trigger"
													onClick={handleToggleMenu}
												/>
											) : (
												<MenuFoldOutlined
													className="trigger"
													onClick={handleToggleMenu}
												/>
											)}
										</>
									)}
								</div>
							</Col>
							<Col
								md={21}
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "flex-start",
								}}
							></Col>
							<Col
								md={2}
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<div>
									<Button onClick={() => showConfirmLogout()}>
										<LogoutOutlined /> Sair
									</Button>
								</div>
							</Col>
						</Row>
					</Header>
					<Content
						style={{
							padding: 16,
							minHeight: 280,
							position: "relative",
							overflowY: "auto",
						}}
					>
						<Switch>
							<Router isPrivate path="/" exact component={Home} />

							{/* franchises */}
							<h1>dasd</h1>
						</Switch>
					</Content>
				</Layout>
			</Container>
		</Container>
	);
};

export default _Layout;
