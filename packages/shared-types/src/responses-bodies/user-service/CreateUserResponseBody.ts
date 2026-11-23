import User from "../../database-schema/User"

export default interface CreateUserResponseBody {
  data: {
    user: User;
  };
}
