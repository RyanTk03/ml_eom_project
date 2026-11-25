import type { CreateProjectRequestBody } from "@ml-eom/shared-types/requests-bodies/project-service";
import { Project, ProjectDoc } from "../models/project.model";
import { AccessTokenPayloadData } from "@ml-eom/shared-types";
import UnauthorizedAction from "../errors/unauthorized-action";
import { createGithubRepo } from "../libs/github";
import env from "../libs/env";
import ConflictError from "../errors/conflict";
import pRetry from "p-retry";

export const createMyProject = async (data: CreateProjectRequestBody, authenticatedUser?: AccessTokenPayloadData) => {
  if (!authenticatedUser?.userId) throw new UnauthorizedAction();

  // if (data.org && !ALLOWED_ORGS.includes(data.org)) throw new ForbiddenError("Organisation non autorisée");

  // 1. On enregistre l'intention AVANT l'effet de bord (champs whitelistés, pas de ...data)
  let project: ProjectDoc & { _id: Object };
  try {
    project = await Project.create({
      name: data.name,
      owner: data.org ?? env.GITHUB_USERNAME,
      repoName: data.repoName,
      org: data.org,
      private: data.private,
      description: data.description,
      status: "pending",
      createdBy: authenticatedUser.userId,
    });
  } catch (e: any) {
    if (e.code === 11000) throw new ConflictError("Ce nom de repo est déjà utilisé");
    throw e;
  }

  // 2. Création du repo
  let repo;
  try {
    repo = await createGithubRepo(env.GITHUB_ACCESS_TOKEN, {
      repoName: data.repoName,
      private: data.private,
      description: data.description,
      org: data.org,
    });
  } catch (error) {
    await Project.updateOne(
      { _id: project._id },
      { status: "failed", failureReason: String((error as Error).message) }
    ).catch((e) => console.error({ e, projectId: project._id }, "impossible de marquer failed"));
    throw error;
  }

  // 3. Finalisation (avec retries courts)
  try {
    const ready = await pRetry(() =>
      Project.findByIdAndUpdate(
        project._id,
        { status: "ready", repoId: String(repo.githubRepoId), repoName: repo.repoName, org: repo.org },
        { new: true }
      ),
      { retries: 3, minTimeout: 200 }
    );
    return ready!.toObject();
  } catch (error) {
    // Le repo existe, le projet reste "pending" : le job de réconciliation le réparera
    console.error({ projectId: project._id, repo }, "repo créé mais mise à jour DB échouée");
    throw error;
  }
};

export const listMyProjects = async (authenticatedUser?: AccessTokenPayloadData) => {
  console.log("auth", authenticatedUser);
  if (!authenticatedUser?.userId) {
    throw new UnauthorizedAction();
  }

  const projects = await Project.find({
    createdBy: authenticatedUser.userId,
  });

  return projects.map(project => project.toObject);
}

export const getOneOfMyProject = () => {
  
}
