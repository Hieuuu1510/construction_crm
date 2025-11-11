/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from "axios";

class BaseApi {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl?: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl || process.env.BACKEND_API_URL,
    });
  }

  async GET<T = any>(url: string, params?: any, config?: any): Promise<T> {
    return this.axiosInstance

      .get(url, { params, ...(config as any) })
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  }

  async POST<T = any>(url: string, data?: any, config?: any): Promise<T> {
    return this.axiosInstance
      .post(url, data, { ...config })
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  }

  async PUT<T = any>(url: string, data?: any, config?: any): Promise<T> {
    return this.axiosInstance
      .put(url, data, { ...config })
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  }

  async DELETE<T = any>(url: string, config?: any): Promise<T> {
    return this.axiosInstance
      .delete(url, { ...config })
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  }
}

export { BaseApi };

const ApiClient = new BaseApi();

export default ApiClient;
