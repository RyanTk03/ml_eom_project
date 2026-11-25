import { model, Schema, SchemaTypes, Types } from "mongoose";
import type { Project as ProjectSchema } from "@ml-eom/shared-types/database-schema"

export type ProjectDoc = Omit<ProjectSchema, "createdBy"> & { createdBy: Types.ObjectId };

export const projectSchema: Schema<ProjectDoc> = new Schema<ProjectDoc>({
  name: { type: String, required: true },
  owner: { type: String, required: true },          // org ou user GitHub cible
  repoName: { type: String, required: true },
  repoId: { type: String },
  org: { type: String },
  private: { type: Boolean, default: false, required: true },
  description: { type: String, default: "" },
  status: { type: String, enum: ["pending", "ready", "failed"], default: "pending", required: true },
  failureReason: { type: String },
  createdBy: { type: SchemaTypes.ObjectId, required: true },
}, { timestamps: true });

// Un seul projet actif par repo, les "failed" libèrent le nom
projectSchema.index(
  { owner: 1, repoName: 1 },
  { unique: true, partialFilterExpression: { status: { $in: ["pending", "ready"] } } }
);
projectSchema.index({ status: 1, createdAt: 1 }); // pour le job de réconciliation

export const Project = model<ProjectDoc>("Project", projectSchema);
