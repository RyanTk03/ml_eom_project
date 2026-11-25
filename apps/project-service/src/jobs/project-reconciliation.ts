import env from "../libs/env";
import { getGithubRepo } from "../libs/github";
import { Project } from "../models/project.model";

const reconcilePendingProjects = async () => {
  const stale = await Project.find({
    status: "pending",
    createdAt: { $lt: new Date(Date.now() - 5 * 60_000) },
  }).limit(100);

  for (const p of stale) {
    const repo = await getGithubRepo(env.GITHUB_ACCESS_TOKEN, p.owner, p.repoName);

    // Le repo existe et a été créé après notre intention : c'est le nôtre
    if (repo && new Date(repo.created_at) >= p.createdAt) {
      await Project.updateOne(
        { _id: p._id },
        { status: "ready", repoId: String(repo.id), org: repo.owner.type === "Organization" ? repo.owner.login : undefined }
      );
    } else {
      await Project.updateOne({ _id: p._id }, { status: "failed", failureReason: "repo introuvable" });
    }
  }
};

export default reconcilePendingProjects;
