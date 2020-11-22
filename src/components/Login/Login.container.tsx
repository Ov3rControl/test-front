import { AxiosResponse } from "axios";
import React from "react";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { User } from "../../store/atoms/atom";
import { LoginFormType } from "../../types";
import api from "../../utils/api";
import { LoginView } from "./Login.view";

export const Login = () => {
  const history = useHistory();
  const setUserState = useSetRecoilState(User);

  const onFinish = (value: LoginFormType) => {
    api.postData("/auth", value, "POST").then((res: AxiosResponse) => {
      if (res.data.auth) {
        const { role, token } = res.data;
        setUserState({ token, role });
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        role === "user" ? history.push("/home") : history.push("/dashboard");
      }
    });
  };

  return <LoginView onFinish={onFinish} />;
};
