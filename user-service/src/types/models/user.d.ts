import { HydratedDocument, Model } from "mongoose";

interface UserSchema {
  firstName: string;
  lastName: string;
  organizations: {
    id: string;
    name: string;
    role: string;
  }[]
}

export type UserDocument = HydratedDocument<UserSchema>;

export type UserModel = Model<UserSchema>;
