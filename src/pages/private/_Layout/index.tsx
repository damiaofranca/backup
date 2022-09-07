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
import { Button, Col, Layout, Menu, Modal, Row } from "antd";
import React, { useState } from "react";
import { Switch, useHistory, useLocation } from "react-router-dom";
import logoImage from "../../../assets/logo.svg";
import { useAuth } from "../../../providers/Auth";
import Router from "../../../routes/route";
import { Clients } from "../Clients";
import { Details } from "../Clients/Details";
import Home from "../Home";
import { Leads } from "../Leads";
import { Partners } from "../Partners";
import { Products } from "../Products";
import { DetailsProduct } from "../Products/Details";
import { Users } from "../Users";
import { Container } from "./styles";

const { Header, Content, Sider } = Layout;

const _Layout = () => {
  const { pathname } = useLocation();
  const { logout } = useAuth();
  const history = useHistory();
  const [expanded, setExpanded] = useState(false);

  const handleToggleMenu = () => {
    setExpanded(!expanded);
  };

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
    <Container aria-label="container-el">
      <Container>
        <Sider
          trigger={null}
          collapsible
          collapsed={expanded}
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
          <Menu theme="light" mode="inline" defaultSelectedKeys={[pathname.split("/")[1]]} onClick={handleOnClickMenuItem}>
            <Menu.Item key="/" icon={<DashboardOutlined />}>
              Dashboard
            </Menu.Item>

            <Menu.Item key="partners" icon={<UserOutlined />}>
              Parceiros
            </Menu.Item>

            <Menu.Item key="leads" icon={<ProfileOutlined />}>
              Leads
            </Menu.Item>

            <Menu.Item key="users" icon={<UserOutlined />}>
              Usuários
            </Menu.Item>

            <Menu.Item key="clients" icon={<SmileOutlined />}>
              Clientes
            </Menu.Item>

            <Menu.Item key="products" icon={<InboxOutlined />}>
              Produtos
            </Menu.Item>
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
                  {!expanded ? (
                    <MenuUnfoldOutlined className="trigger" onClick={handleToggleMenu} />
                  ) : (
                    <MenuFoldOutlined className="trigger" onClick={handleToggleMenu} />
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
              <Router isPrivate path="/partners" component={Partners} />

              <Router isPrivate path="/leads" component={Leads} />
              <Router isPrivate path="/users" component={Users} />

              <Router isPrivate exact path="/clients" component={Clients} />

              <Router isPrivate component={Details} path="/clients/:clientId" />

              <Router exact isPrivate path="/products" component={Products} />
              <Router isPrivate path="/products/:productId" component={DetailsProduct} />
            </Switch>
          </Content>
        </Layout>
      </Container>
    </Container>
  );
};

export default _Layout;
