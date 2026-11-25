import { axiosForApiCall } from "../client"
import type { CreateProjectRequestBody } from "@ml-eom/shared-types/requests-bodies/project-service";
import type { CreateProjectResponseBody, GetMyProjectsResponseBody } from "@ml-eom/shared-types/responses-bodies/project-service";

export const listProjects = async (params: unknown) => {
  return await axiosForApiCall.get<GetMyProjectsResponseBody>("/projects/me", { params });
}

export const createProject = async (data: CreateProjectRequestBody) => {
  return await axiosForApiCall.post<CreateProjectResponseBody>("/projects/me", data);
}