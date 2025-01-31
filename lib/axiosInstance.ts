import baseAxios from "axios";
import { parseAxiosError } from "@/lib/parseAxiosError";

const createAxiosInstance = () => {
  const instance = baseAxios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  // set the content type to json
  instance.defaults.headers.post["Content-Type"] = "application/json";
  instance.defaults.headers.patch["Content-Type"] = "application/json";
  instance.defaults.headers.get["Content-Type"] = "application/json";

  // include the token in the header
  instance.interceptors.request.use(async (request) => {
    request.url = request.url?.replace("/api", "");

    const authToken = localStorage.getItem("token");
    if (authToken && request.headers && !request.headers.Authorization) {
      request.headers.Authorization = `Bearer ${authToken}`;
    }
    return request;
  });

  // handle token expired and get new token with refresh token
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (
        error?.response?.status === 401 &&
        originalRequest.url?.includes("/auth/refresh/")
      ) {
        window.location.href = "/login";
        return;
      }
      if (
        error?.response?.status === 401 &&
        error?.response?.data?.code === "token_not_valid" &&
        !originalRequest._retry &&
        localStorage.getItem("refreshToken") &&
        localStorage.getItem("token")
      ) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem("refreshToken");
        const { data } = await instance.post("/auth/refresh/", {
          refresh: refreshToken,
        });
        localStorage.setItem("token", data.access);
        return instance(originalRequest);
      }
      return Promise.reject(error);
    },
  );

  // use parseAxiosError to show error message
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Dont show error if the status is 401
      if (error?.response?.status === 401) {
        return;
      }
      // Dont show error if the request is manually canceled
      if (error?.code === "ERR_CANCELED") {
        return;
      }

      parseAxiosError(error);
    },
  );

  return instance;
};

const axios = createAxiosInstance();

export const customAxios = async <T>(
  ...args: Parameters<typeof axios>
): Promise<T> => {
  const response = await axios(...args);
  return response.data;
};

export default axios;
