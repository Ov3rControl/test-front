import React, { FunctionComponent } from "react";
import { Form, Input, Button } from "antd";
import styles from "./Login.view.module.css";
import { LoginFormType } from "../../types";

type Props = {
  onFinish: (values: LoginFormType) => void;
};

export const LoginView: FunctionComponent<Props> = ({
  onFinish,
}: Props): JSX.Element => {
  return (
    <div className={styles.Container}>
      <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish}>
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
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
