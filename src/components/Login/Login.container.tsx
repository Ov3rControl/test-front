import { AxiosResponse } from "axios";
import React from "react";
import { useHistory } from "react-router-dom";
import { LoginFormType } from "../../types";
import api from "../../utils/api";
import { LoginView } from "./Login.view";

export const Login = () => {
  const history = useHistory();
  const onFinish = (value: LoginFormType) => {
    api.postData("/auth", value, "POST").then((res: AxiosResponse) => {
      if (res.data.auth) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        res.data.role === "user"
          ? history.push("/home")
          : history.push("/dashboard");
      }
    });
  };

  return <LoginView onFinish={onFinish} />;
};
