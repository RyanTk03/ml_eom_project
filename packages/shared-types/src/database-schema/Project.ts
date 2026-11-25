export type ProjectStatus = "pending" | "ready" | "failed";

export default interface Project {
  name: string;
  owner: string;
  repoName: string;
  repoId?: string;
  org?: string;
  private: boolean;
  description?: string;
  status: ProjectStatus;
  failureReason?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}
