import { AxiosResponse } from "axios";
import React from "react";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import {
  NotificationStatus,
  showNotification,
} from "../../helpers/showNotication";
import { User } from "../../store/atoms/atom";
import { LoginFormType } from "../../types";
import api from "../../utils/api";
import { LoginView } from "./Login.view";

export const Login = () => {
  const history = useHistory();
  const setUserState = useSetRecoilState(User);

  const onFinish = (value: LoginFormType) => {
    api
      .postData("/auth/signin", value, "POST")
      .then((res: AxiosResponse) => {
        const { role, accessToken } = res.data;
        setUserState({ token: accessToken, role });
        localStorage.setItem("token", accessToken);
        localStorage.setItem("role", role);
        role === 1 ? history.push("/home") : history.push("/dashboard");
      })
      .catch(() =>
        showNotification(
          NotificationStatus.error,
          "Unauthorized",
          "Invalid Login Credentials"
        )
      );
  };

  return <LoginView onFinish={onFinish} />;
};
