import { axiosForApiCall } from "../client"
import { LoginRequestBody, RegisterRequestBody } from "@ml-eom/shared-types/requests-bodies/auth-service";

export const login = (credentials: LoginRequestBody) => {
  return axiosForApiCall.post('/auth/login', credentials)
}

export const register = (body: RegisterRequestBody) => {
  return axiosForApiCall.post("/auth/register", body)
}
