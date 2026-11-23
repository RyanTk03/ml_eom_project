import { axiosForApiCall } from "../client"
import { LoginRequestBody, RegisterRequestBody } from "@ml-eom/shared-types/requests-bodies/auth-service";
import { LoginResponseBody, RegisterResponseBody } from "@ml-eom/shared-types/responses-bodies/auth-service";

export const login = async (credentials: LoginRequestBody) => {
  return await axiosForApiCall.post<LoginResponseBody>('/auth/login', credentials)
}

export const register = async (body: RegisterRequestBody) => {
  return await axiosForApiCall.post<RegisterResponseBody>("/auth/register", body)
}

export const getSession = async () => {
  return await axiosForApiCall.get("/auth/session");
}
