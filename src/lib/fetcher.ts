import axios, { AxiosError } from "axios";
import { Constants } from "./constants";

const API = axios.create({
  baseURL: Constants.NODE_BACKEND_URL,
  headers: { "Content-Type": "application/json" },
});

export class ApiException {
  statusCode: number;
  message: string;
  constructor(error: any) {
    if (error instanceof AxiosError) {
      this.message =
        error.response?.data?.message || Constants.DEFAULT_ERROR_MESSAGE;
      this.statusCode = error.response?.data?.statusCode || error.status || 500;
    } else {
      this.message = error.message || Constants.DEFAULT_ERROR_MESSAGE;
      this.statusCode = error.status || 500;
    }
  }

  toString() {
    return this.message;
  }
}

export class Fetcher {
  static async get<T = any>(url: string) {
    try {
      const { data } = await API.get(url, {
        headers: { authorization: "Bearer " + localStorage.getItem("token") },
      });
      return data as T;
    } catch (error) {
      throw new ApiException(error);
    }
  }

  static async post<ReturnType = any, BodyType = any>(
    url: string,
    body: BodyType
  ) {
    try {
      const { data } = await API.post(url, body, {
        headers: { authorization: "Bearer " + localStorage.getItem("token") },
      });
      return data as ReturnType;
    } catch (error) {
      throw new ApiException(error);
    }
  }
  static async put<ReturnType = any, BodyType = any>(
    url: string,
    body: BodyType
  ) {
    try {
      const { data } = await API.put(url, body, {
        headers: { authorization: "Bearer " + localStorage.getItem("token") },
      });
      return data as ReturnType;
    } catch (error) {
      throw new ApiException(error);
    }
  }
  static async delete<ReturnType = any>(url: string) {
    try {
      const { data } = await API.delete(url, {
        headers: { authorization: "Bearer " + localStorage.getItem("token") },
      });
      return data as ReturnType;
    } catch (error) {
      throw new ApiException(error);
    }
  }
}
