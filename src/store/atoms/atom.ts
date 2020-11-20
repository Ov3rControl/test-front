import { atom } from "recoil";

export const User = atom({
  key: "user",
  default: {
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role"),
  },
});
