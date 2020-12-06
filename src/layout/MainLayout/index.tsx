import React, { FunctionComponent } from "react";
import { Button, InputNumber, Layout, Menu, Popover } from "antd";
import styles from "./index.module.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { AutoBidSettings, User } from "../../store/atoms/atom";
import { useHistory } from "react-router-dom";

const { Header, Content, Footer } = Layout;

export const MainLayout: FunctionComponent = ({ children }): JSX.Element => {
  const user = useRecoilValue(User);
  const history = useHistory();
  const [inputNumber, setInputNumber] = React.useState<number>(0);
  const [autoBidSettings, setAutoBidSettings] = useRecoilState(AutoBidSettings);
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
          content={
            <div>
              <p>Current Balance : {autoBidSettings?.maxBidAmount}</p>
              <p>Max Bid Amount</p>
              <InputNumber
                value={inputNumber}
                onChange={(value) => setInputNumber(Number(value))}
              />
              <Button
                type="ghost"
                onClick={() =>
                  setAutoBidSettings({ maxBidAmount: inputNumber })
                }
              >
                Save
              </Button>
            </div>
          }
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
