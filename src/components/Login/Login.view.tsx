import React, { FunctionComponent } from "react";
import { Form, Input, Button, Switch } from "antd";
import styles from "./Login.view.module.css";
import { LoginFormType } from "../../types";

const { useState } = React;

type Props = {
  onFinish: (values: LoginFormType, type: string) => void;
};

export const LoginView: FunctionComponent<Props> = ({
  onFinish,
}: Props): JSX.Element => {
  const [mode, setMode] = useState<boolean>(true);
  const switchOnChange = (checked: boolean) => {
    setMode(checked);
  };

  return (
    <div className={styles.Container}>
      <Switch
        className={styles.switcher}
        checkedChildren="Register"
        unCheckedChildren="Login"
        defaultChecked
        onChange={switchOnChange}
      />
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={(value) => onFinish(value, mode ? "register" : "login")}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {mode ? "Register" : "Login"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
