import axios from "axios";

const axiosAuthInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL,
  withCredentials: true,
});

const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

const axiosUploadflyInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_UPLOADFLY_URL,
});

export {
  axiosAuthInstance as axiosAuth,
  axiosInstance as axios,
  axiosUploadflyInstance as uploadfly,
};
