import type AuthDetails from "../../database-schema/AuthDetails"

export default interface RegisterResponseBody {
  data: {
    authDetails: AuthDetails;
  };
};
