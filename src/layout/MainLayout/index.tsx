import React, { FunctionComponent } from "react";
import { Button, Layout, Menu } from "antd";
import styles from "./index.module.css";
import { useRecoilValue } from "recoil";
import { User } from "../../store/atoms/atom";
import { useHistory } from "react-router-dom";

const { Header, Content, Footer } = Layout;

export const MainLayout: FunctionComponent = ({ children }): JSX.Element => {
  const user = useRecoilValue(User);
  const history = useHistory();

  const navigate = () =>
    user.role === "admin" ? history.push("/dashboard") : history.push("/home");

  const logout = () => {
    localStorage.clear();
    history.push("/login");
  };

  return (
    <Layout className="layout">
      <Header className={styles.header}>
        <Menu className={styles.mainMenu} theme="light" mode="horizontal">
          <Menu.Item onClick={navigate} key="1">
            {user.role === "admin" ? "Dashboard" : "Home"}
          </Menu.Item>
          <Button onClick={logout} danger>
            Logout
          </Button>
        </Menu>
      </Header>
      <Content className={styles.content}>{children}</Content>
      <Footer className={styles.footer}>
        Scopic Antique Seller Webapp Task
      </Footer>
    </Layout>
  );
};

export default MainLayout;
