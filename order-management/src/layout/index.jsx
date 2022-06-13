import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FormOutlined,
  HomeOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link } from "wouter";
import Routes from "../routes";
import "./index.scss";
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: (
                <Link href="/dashboard">
                  <HomeOutlined />
                </Link>
              ),
              label: <Link href="/dashboard">Dashboard</Link>,
            },
            {
              key: "2",
              icon: (
                <Link href="/orders">
                  <DatabaseOutlined />
                </Link>
              ),
              label: <Link href="/orders">Orders</Link>,
            },
            {
              key: "3",
              icon: (
                <Link href="/create-order">
                  <FormOutlined />
                </Link>
              ),
              label: <Link href="/create-order">Create Order</Link>,
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Routes />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
