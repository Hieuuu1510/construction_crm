import CookieManager from "@/manager/CookieManager";
import { Axios, AxiosError } from "axios";

/* eslint-disable @typescript-eslint/no-explicit-any */
class initializeInterceptors {
  constructor(private axiosInstance: Axios) {}

  init() {
    this.axiosInstance.interceptors.request.use(
      (request) => {
        const token = CookieManager.getCookie("token");
        if (token) {
          request.headers.Authorization = `Bearer ${token}`;
        }
        return request;
      },
      (error) => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error?.response?.status === 401) {
          return this.handleAuthError(error);
        }
        return Promise.reject(error);
      }
    );
  }

  private async handleAuthError(error: AxiosError) {
    const refetchToken = CookieManager.getCookie("token");
    if (!refetchToken) {
      window.location.href = "/login";
    }

    try {
      const response = await this.axiosInstance.post("/auth/refresh-token", {
        refetchToken,
      });

      const { token } = response.data;
      CookieManager.setCookie("token", token);
      if (error.config) {
        error.config.headers.Authorization = `Bearer ${token}`;
        // gọi lại request bị lỗi với token mới
        return this.axiosInstance.request(error.config);
      }

      return Promise.reject(error);
    } catch {
      window.location.href = "/login";
      return Promise.reject(error);
    }
  }
}

export default initializeInterceptors;
