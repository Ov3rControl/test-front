import React, { FunctionComponent } from "react";
import { Button, Layout, Menu, Popover } from "antd";
import styles from "./index.module.css";
import { useRecoilValue } from "recoil";
import { User } from "../../store/atoms/atom";
import { useHistory } from "react-router-dom";
import { AutoBidController } from "./autoBidController";

const { Header, Content, Footer } = Layout;

export const MainLayout: FunctionComponent = ({ children }): JSX.Element => {
  const user = useRecoilValue(User);
  const history = useHistory();
  const [visible, setVisible] = React.useState<boolean>(false);

  const navigate = () =>
    user.role === "0" ? history.push("/dashboard") : history.push("/home");

  const logout = () => {
    localStorage.clear();
    history.push("/login");
  };

  const AutoBidPopOver = () => {
    if (user.role === "1") {
      return (
        <Popover
          content={<AutoBidController />}
          title="Configuration"
          trigger="click"
          visible={visible}
          onVisibleChange={(visible) => setVisible(visible)}
        >
          <Button type="primary">Configure Auto Bidding</Button>
        </Popover>
      );
    }
    return <></>;
  };

  return (
    <Layout className="layout">
      <Header className={styles.header}>
        <Menu className={styles.mainMenu} theme="light" mode="horizontal">
          <Menu.Item onClick={navigate} key="1">
            {user.role === "0" ? "Dashboard" : "Home"}
          </Menu.Item>
          {user.role === "1" && (
            <>
              <Menu.Item onClick={() => history.push("/profile")} key="2">
                My Profile
              </Menu.Item>
            </>
          )}
          <Button onClick={logout} danger>
            Logout
          </Button>
        </Menu>
      </Header>
      <AutoBidPopOver />
      <Content className={styles.content}>{children}</Content>
      <Footer className={styles.footer}>
        Scopic Antique Seller Webapp Task
      </Footer>
    </Layout>
  );
};

export default MainLayout;
