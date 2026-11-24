import type { User } from "../../database-schema";

export default interface UserUpdateResponseBody {
  data: {
    user: User;
  };
}
