import axios from "axios";
import { server } from "./server";

const axiosClient = axios.create({
  baseURL: server,
  headers: {
    appid: process.env.NEXT_PUBLIC_APP
  }
});

axiosClient.interceptors.response.use(
  async (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  async (error) => {
    const { response } = error;
    const errorResult = { ...response.data, status: response.status };
    return Promise.reject(errorResult);
  }
);

export default axiosClient;
