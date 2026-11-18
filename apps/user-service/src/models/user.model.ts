import { model, Schema } from "mongoose";
import { UserModel, UserSchema } from "../types/models/user";

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
  organizations: [
    {
      id: Schema.ObjectId,
      name: String,
      role: String,
    },
  ],
}, { timestamps: true });

export const User = model<UserSchema, UserModel>("User", userSchema);
