import React, { FunctionComponent } from "react";
import { Form, Input, Button, Switch, Select } from "antd";
import styles from "./Login.view.module.css";
import { LoginFormType } from "../../types";

const { useState } = React;
const { Option } = Select;

type Props = {
  onFinish: (values: LoginFormType, type: string, userType: string) => void;
};

export const LoginView: FunctionComponent<Props> = ({
  onFinish,
}: Props): JSX.Element => {
  const [mode, setMode] = useState<boolean>(true);
  const [userType, setUserType] = useState<string>("1");
  const switchOnChange = (checked: boolean) => {
    setMode(checked);
  };

  return (
    <div className={styles.Container}>
      <div className={styles.configContainer}>
        <Switch
          className={styles.switcher}
          checkedChildren="Register"
          unCheckedChildren="Login"
          defaultChecked
          onChange={switchOnChange}
        />
        {mode && (
          <Select defaultValue={userType} onChange={setUserType}>
            <Option value="0">Admin</Option>
            <Option value="1">User</Option>
          </Select>
        )}
      </div>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={(value) =>
          onFinish(value, mode ? "register" : "login", userType)
        }
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
