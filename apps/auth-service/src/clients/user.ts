import env from "../libs/env";
import { CreateUserResponseBody } from "@ml-eom/shared-types/responses-bodies/user-service"

export const createUser = async () => {
  const response = await fetch(`${env.USER_SERVICE_URL}/api/users`, { method: "POST" });

  return (await response.json()) as CreateUserResponseBody;
}
