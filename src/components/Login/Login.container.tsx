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
import { axiosApiInstance } from "../../utils/api";
import { LoginView } from "./Login.view";

export const Login = () => {
  const history = useHistory();
  const setUserState = useSetRecoilState(User);

  const onFinish = (value: LoginFormType, type: string, userType: string) => {
    const url = type === "login" ? "/auth/signin" : "/auth/signup";
    axiosApiInstance
      .post(url, { ...value, role: userType })
      .then((res: AxiosResponse) => {
        if (type === "login") {
          const { accessToken } = res.data;
          const role = String(res.data.role);
          setUserState({ token: accessToken, role });
          localStorage.setItem("token", accessToken);
          localStorage.setItem("role", role);
          role === "1" ? history.push("/home") : history.push("/dashboard");
        } else {
          showNotification(
            NotificationStatus.info,
            "Account Created",
            "You can now login"
          );
        }
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
