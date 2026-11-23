import { HydratedDocument, Model } from "mongoose";
import { User as UserSchema } from "@ml-eom/shared-types/database-schema";

export type UserDocument = HydratedDocument<UserSchema>;

export type UserModel = Model<UserSchema>;
