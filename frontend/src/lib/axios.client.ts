import axios from "axios";
import { CustomError } from "@/types/custom-error.type";

const baseURL = import.meta.env.VITE_API_BASE_URL;
console.log(baseURL, "baseurl");
console.log("Env",import.meta.env);


const options = {
  baseURL,
  withCredentials: true,
  timeout: 10000,
};

// Create axios Instance
const API = axios.create(options);

API.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const { data, status } = error.response;

    if (data === "Unauthorized" && status === 401) {
      window.location.href = "/";
    }

    const customError: CustomError = {
      ...error,
      errorCode: data?.errorCode || "UNKNOWN_ERROR",
    };

    return Promise.reject(customError);
  }
);

export default API;
