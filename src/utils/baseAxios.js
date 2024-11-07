import axios from "axios";
import { API_URL } from "../constants";
import { getCookie } from "./cookieHelpers";

const baseAxios = axios.create({
  baseURL: `${API_URL}/api`,
});

baseAxios.interceptors.request.use(
  (config) => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { baseAxios as baseAxios };
