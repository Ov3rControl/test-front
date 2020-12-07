import axios from "axios";
import {
  NotificationStatus,
  showNotification,
} from "../helpers/showNotication";

export const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.request.use(
  async (config) => {
    config.baseURL = "http://localhost:3000/";
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      showNotification(
        NotificationStatus.warning,
        "Session Expired",
        "Please logout and login again"
      );
    }
    if (error.response.status === 500) {
      showNotification(
        NotificationStatus.error,
        "Internal Server Error",
        "Please try again later"
      );
    }
    return Promise.reject(error);
  }
);
