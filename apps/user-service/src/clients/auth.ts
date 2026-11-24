import env from "../libs/env";
import type { SessionResponseBody } from "@ml-eom/shared-types/responses-bodies/auth-service";

export const getSession = async (authorizationHeader: string) => {
  const response = await fetch(`${env.AUTH_SERVICE_URL}/api/auth/session`, {
    headers: {
      Authorization: authorizationHeader,
    },
  });

  return await response.json() as SessionResponseBody;
}