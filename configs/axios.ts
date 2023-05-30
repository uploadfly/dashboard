import axios from "axios";

const axiosAuthInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL,
  withCredentials: true,
});

const axiosInstance = axios.create({
  baseURL: "/",
  withCredentials: true,
});

export { axiosAuthInstance as axiosAuth, axiosInstance as axios };
