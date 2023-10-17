import axios from "axios";

let isRefreshing = false;
let refreshSubscribers = [];

const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

const axiosUploadflyInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_UPLOADFLY_URL,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      const originalRequest = error.config;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          await axiosInstance.post("/auth/refresh");
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          await axiosInstance.post("/logout");
          window.location.reload();
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      } else {
        return new Promise((resolve) => {
          refreshSubscribers.push(() => {
            resolve(axiosInstance(originalRequest));
          });
        });
      }
    }
    return Promise.reject(error);
  }
);

export { axiosInstance as axios, axiosUploadflyInstance as uploadfly };
