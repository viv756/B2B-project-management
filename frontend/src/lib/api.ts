import { LoginResponseType, loginType } from "@/types/api.types";
import API from "./axios.client";

export const loginMutationFn = async (
  data: loginType
): Promise<LoginResponseType> => {
  const response = await API.post("/auth/login", data);
  return response.data;
};