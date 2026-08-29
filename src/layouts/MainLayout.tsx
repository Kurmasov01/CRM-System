import { Layout, Menu, type MenuProps } from "antd";
import { Link, useLocation, Outlet } from "react-router-dom";

function MainLayout() {
  const { Sider, Content } = Layout;
  const location = useLocation();

  type MenuItem = Required<MenuProps>["items"][number];

  const items: MenuItem[] = [
    {
      key: "/todo",
      label: <Link to="todo">TodoPage</Link>,
    },
    {
      key: "/profile",
      label: <Link to="profile">Profile</Link>,
    },
  ];
  const contentStyle: React.CSSProperties = {
    padding: "20px 10%",
  };

  const siderStyle: React.CSSProperties = {
    width: "20%",
    textAlign: "center",
    backgroundColor: "var(--light_2)",
  };

  const layoutStyle: React.CSSProperties = {
    width: "100%",
    minHeight: "100vh",
  };

  const menuStyle: React.CSSProperties = {
    width: "100%",
    backgroundColor: "var(--light_2)",
  };

  return (
    <Layout style={layoutStyle}>
      <Sider style={siderStyle}>
        <Menu
          style={menuStyle}
          selectedKeys={[location.pathname]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Content style={contentStyle}>
        <Outlet />
      </Content>
    </Layout>
  );
}

export default MainLayout;
