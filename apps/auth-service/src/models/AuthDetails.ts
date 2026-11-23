import { Model, model, Schema, SchemaTypes } from "mongoose";
import { AuthDetailsSchema } from "@ml-eom/shared-types/database-schema";

export const authDetailsSchema = new Schema<AuthDetailsSchema>({
  email: {
    type: String,
    minLength: 3,
    maxLength: 255,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minLength: 3,
    required: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
    required: true,
  },
  role: {
    type: String,
    default: "USER",
    required: true,
  },
  refreshTokenId: {
    type: String,
    required: false,
  },
  authProvider: {
    type: String,
    default: "local"
  },
  userId: {
    type: SchemaTypes.ObjectId,
    required: true,
  },
}, { timestamps: true });

export const AuthDetails = model<AuthDetailsSchema, Model<AuthDetailsSchema>>("AuthDetails", authDetailsSchema);
