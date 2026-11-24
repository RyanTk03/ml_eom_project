import { model, Schema } from "mongoose";
import { UserModel } from "../types/models/user";
import { User as UserSchema } from "@ml-eom/shared-types/database-schema";

const userSchema = new Schema<UserSchema>({
  firstName: {
    type: String,
    minlength: 2,
    maxlength: 25,
    unique: false,
    required: false,
  },
  lastName: {
    type: String,
    minlength: 2,
    maxlength: 25,
    unique: false,
    required: false,
  },
}, { timestamps: true });

export const User = model<UserSchema, UserModel>("User", userSchema);
