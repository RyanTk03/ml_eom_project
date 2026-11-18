import { model, Schema } from "mongoose";

const organizationSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 25,
    unique: true
  },
  createdBy: {
    type: Schema.ObjectId,
    required: true,
  },
}, { timestamps: true });

export const Organization = model("Organization", organizationSchema);
