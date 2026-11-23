import { model, Schema } from "mongoose";
import { UserModel } from "../types/models/user";
import { User as UserSchema } from "@ml-eom/shared-types/database-schema";

const userSchema = new Schema<UserSchema>({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 25,
    unique: false,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 25,
    unique: false,
  },
}, { timestamps: true });

export const User = model<UserSchema, UserModel>("User", userSchema);
