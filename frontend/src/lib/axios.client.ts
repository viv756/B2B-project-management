import axios from "axios";
import { CustomError } from "@/types/custom-error.type";
import { useStore } from "@/store/store";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const options = {
  baseURL,
  withCredentials: true,
  timeout: 10000,
};

// Create axios Instance
const API = axios.create(options);

API.interceptors.request.use((config) => {
  
  const accessToken = useStore.getState().accessToken;
  if (accessToken) {
    config.headers["Authorization"] = "Bearer " + accessToken;
  }

  return config;
});

API.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const { data } = error.response;

    // if (data === "Unauthorized" && status === 401) {
    //   window.location.href = "/";
    // }

    const customError: CustomError = {
      ...error,
      errorCode: data?.errorCode || "UNKNOWN_ERROR",
    };

    return Promise.reject(customError);
  }
);

export default API;
