import axiosInstance from "../axios/axios";

export const RegisterApi = (value) => {
  return axiosInstance.post("/register", { ...value });
};

export const LoginApi = (value) => {
  return axiosInstance.post("/login", { ...value });
};
