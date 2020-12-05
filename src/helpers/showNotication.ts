import { notification } from "antd";

export enum NotificationStatus {
  info = "info",
  success = "success",
  error = "error",
  warning = "warning",
}
export const showNotification = (
  type: NotificationStatus,
  message: string,
  description: string
) => {
  notification[type]({
    message,
    description,
  });
};
