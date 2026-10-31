import { model, Schema } from "mongoose";

const organizationUserSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 25,
    unique: true
  },
}, { timestamps: true });

export const User = model("Organization", organizationUserSchema);
