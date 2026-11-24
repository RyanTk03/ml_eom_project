import { AuthDetailsSchema } from "../../database-schema";

export default interface SessionResponseBody {
  data: {
    session: AuthDetailsSchema;
  };
};
