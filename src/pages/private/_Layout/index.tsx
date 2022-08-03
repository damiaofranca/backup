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
import { Button, Col, Layout, Menu, Modal, Row } from "antd";
import React, { useState } from "react";
import { Switch, useHistory, useLocation } from "react-router-dom";
import logoImage from "../../../assets/logo.svg";
import { CheckPermArg, useAuth } from "../../../providers/Auth";
import Router from "../../../routes/route";
import { UserType } from "../../../utils/enums";
import Home from "../Home";
import { Partners } from "../Partners/Partners";
import { Container } from "./styles";

const { Header, Content, Sider } = Layout;

const _Layout = () => {
	const { pathname } = useLocation();
	const { logout, checkPermission, userTypeIs } = useAuth();
	const history = useHistory();
	const [expanded, setExpanded] = useState(true);

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
		<Container>
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
							<Menu.Item key="partners" icon={<ShoppingCartOutlined />}>
								Franquias
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
						</Switch>
					</Content>
				</Layout>
			</Container>
		</Container>
	);
};

export default _Layout;
