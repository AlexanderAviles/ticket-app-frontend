import { Button, Layout, Menu, theme } from "antd";
import { UserOutlined, VideoCameraOutlined, UploadOutlined, } from "@ant-design/icons";
import { BrowserRouter as Router, Route, Link, NavLink, Routes, Navigate } from 'react-router-dom';
import {IngresarPage} from './Ingresar'
import { ColaPage } from "./Cola";
import { CrearTicketPage } from "./CrearTicket";
import { EscritorioPage } from "./Escritorio";
import { useContext } from "react";
import { UiContext } from "../context/UIContext";

const { Sider, Content } = Layout;

export const RouterPage = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { ocultarMenu } = useContext(UiContext)
  return (
    <Router>
      <Layout style={{ height: "100vh" }}>
        <Sider hidden={ocultarMenu} collapsedWidth='0' breakpoint="md">
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: <Link to='/ingresar' >Ingresar</Link>,
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: <Link to='/cola' >Cola de Tickets</Link>,
              },
              {
                key: "3",
                icon: <UploadOutlined />,
                label: <NavLink to='/crear' >Crear Tickets</NavLink>,
              },
            ]}
          />
        </Sider>
        <Layout>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Routes>
              <Route path="/ingresar" Component={ IngresarPage }/>
              <Route path="/cola" Component={ ColaPage }/>
              <Route path="/crear" Component={ CrearTicketPage }/>
              <Route path="/escritorio" Component={ EscritorioPage }/>

              <Route
                  path="*"
                  element={<Navigate to="/ingresar" replace />}
              />
            </Routes>

          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};
