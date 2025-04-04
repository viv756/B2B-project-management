import {
  AllProjectPayloadType,
  AllProjectResponseType,
  AllWorkspaceResponseType,
  CreateWorkspaceResponseType,
  CreateWorkspaceType,
  CurrentUserResponseType,
  LoginResponseType,
  loginType,
  ProjectByIdPayloadType,
  registerType,
  WorkspaceByIdResponseType,
} from "@/types/api.types";
import API from "./axios.client";

// ************** USER AUTH *****************
export const getCurrentUserQueryFn = async (): Promise<CurrentUserResponseType> => {
  const response = await API.get(`/user/current`);
  return response.data;
};

export const loginMutationFn = async (data: loginType): Promise<LoginResponseType> => {
  const response = await API.post("/auth/login", data);
  return response.data;
};

export const registerMutationFn = async (data: registerType) =>
  await API.post("/auth/register", data);

// ******************* WORKSPACE *******************
export const getAllWorkspacesUserIsMemberQueryFn = async (): Promise<AllWorkspaceResponseType> => {
  const response = await API.get(`/workspace/all`);
  return response.data;
};

export const createWorkspaceMutationFn = async (
  data: CreateWorkspaceType
): Promise<CreateWorkspaceResponseType> => {
  const response = await API.post(`/workspace/create/new`, data);
  return response.data;
};

export const getWorkspaceByIdQueryFn = async (
  workspaceId: string
): Promise<WorkspaceByIdResponseType> => {
  const response = await API.get(`/workspace/${workspaceId}`);
  return response.data;
};

export const deleteProjectMutationFn = async ({
  workspaceId,
  projectId,
}: ProjectByIdPayloadType): Promise<{
  message: string;
}> => {
  const response = await API.delete(
    `/project/${projectId}/workspace/${workspaceId}/delete`
  );
  return response.data;
};

export const getProjectsInWorkspaceQueryFn = async ({
  workspaceId,
  pageSize = 10,
  pageNumber = 1,
}: AllProjectPayloadType): Promise<AllProjectResponseType> => {
  const response = await API.get(
    `/project/workspace/${workspaceId}/all?pageSize=${pageSize}&pageNumber=${pageNumber}`
  );
  return response.data;
};