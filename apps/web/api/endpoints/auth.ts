import { axiosForApiCall } from "../client"

export const login = () => {
  const response = axiosForApiCall.post('/auth/login')
}

export const register = () => {
  const response = axiosForApiCall.post("/auth/register")
}
