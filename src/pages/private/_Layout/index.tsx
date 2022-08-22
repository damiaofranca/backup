import {
	DashboardOutlined,
	ExclamationCircleOutlined,
	LogoutOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	ProfileOutlined,
	SmileOutlined,
	UserOutlined,
	InboxOutlined,
} from "@ant-design/icons";
import { Switch, useHistory, useLocation } from "react-router-dom";
import { CheckPermArg, useAuth } from "../../../providers/Auth";
import { Button, Col, Layout, Menu, Modal, Row } from "antd";
import logoImage from "../../../assets/logo.svg";
import { UserType } from "../../../utils/enums";
import { Details } from "../Clients/Details";
import Router from "../../../routes/route";
import React, { useState } from "react";
import { Partners } from "../Partners";
import { Clients } from "../Clients";
import { Container } from "./styles";
import { Leads } from "../Leads";
import { Users } from "../Users";
import Home from "../Home";
import { Products } from "../Products";

const { Header, Content, Sider } = Layout;

const _Layout = () => {
	const { pathname } = useLocation();
	const { logout, checkPermission, userTypeIs } = useAuth();
	const history = useHistory();
	const [expanded, setExpanded] = useState(false);

	const handleToggleMenu = () => {
		setExpanded(!expanded);
	};

	const buildMenu = (userType: CheckPermArg, children: React.ReactNode) =>
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

	return (
		<Container data-testid={"container-el"}>
			<Container>
				<Sider
					trigger={null}
					collapsible
					collapsed={userTypeIs() ? expanded : !expanded}
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
							UserType.Franchisee,
							<Menu.Item key="/" icon={<DashboardOutlined />}>
								Dashboard
							</Menu.Item>
						)}

						{buildMenu(
							UserType.Admin,
							<Menu.Item key="partners" icon={<UserOutlined />}>
								Parceiros
							</Menu.Item>
						)}
						{buildMenu(
							UserType.Admin,
							<Menu.Item key="leads" icon={<ProfileOutlined />}>
								Leads
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
							<Menu.Item key="clients" icon={<SmileOutlined />}>
								Clientes
							</Menu.Item>
						)}

						{buildMenu(
							UserType.Admin,
							<Menu.Item key="products" icon={<InboxOutlined />}>
								Produtos
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
										UserType.Franchisee,
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
							<Router
								isPrivate
								userType={UserType.Admin || UserType.Franchisee}
								path="/partners"
								component={Partners}
							/>

							<Router
								isPrivate
								userType={UserType.Admin || UserType.Franchisee}
								path="/leads"
								component={Leads}
							/>
							<Router
								isPrivate
								userType={UserType.Admin || UserType.Franchisee}
								path="/users"
								component={Users}
							/>

							<Router
								isPrivate
								exact
								userType={UserType.Admin || UserType.Franchisee}
								path="/clients"
								component={Clients}
							/>

							<Router
								isPrivate
								userType={UserType.Admin}
								path="/clients/:clientId"
								component={Details}
							/>

							<Router
								isPrivate
								userType={UserType.Admin}
								path="/products"
								component={Products}
							/>
						</Switch>
					</Content>
				</Layout>
			</Container>
		</Container>
	);
};

export default _Layout;
