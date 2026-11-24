import { User } from "../../database-schema";

export default interface MyInfoResponseBody {
  data: {
    me: User;
  };
}
