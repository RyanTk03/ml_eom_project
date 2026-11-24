import type { MyInfoResponseBody, UserUpdateResponseBody } from "@ml-eom/shared-types/responses-bodies/user-service";
import type { UserUpdateRequestBody } from "@ml-eom/shared-types/requests-bodies/user-service";
import { axiosForApiCall } from "../client"

export const getMe = async () => {
  return await axiosForApiCall.get<MyInfoResponseBody>("/users/me");
}

export const updateUser = async (data: UserUpdateRequestBody) => {
  return await axiosForApiCall.put<UserUpdateResponseBody>("/users/me", data);
}
