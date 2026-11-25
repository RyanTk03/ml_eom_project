import { Octokit, type RestEndpointMethodTypes } from "@octokit/rest";

export const createGithubRepo = async (token: string, params: { repoName: string; private: boolean; org?: string; description?: string }) => {
  const octokit = new Octokit({ auth: token });

  const common = {
    name: params.repoName,
    private: params.private,
    description: params.description,
    auto_init: true,
  };

  const { data } = params.org
    ? await octokit.rest.repos.createInOrg({ org: params.org, ...common })
    : await octokit.rest.repos.createForAuthenticatedUser(common);

  return {
    githubRepoId: data.id,
    repoUrl: data.html_url,
    owner: data.owner.login,
    repoName: data.name,
    org: data.owner.type === "Organization" ? data.owner.login : undefined,
  };
};

export const getGithubRepo = async (token: string, owner: string, repo: string) => {
  const octokit = new Octokit({ auth: token });
  try {
    const { data } = await octokit.rest.repos.get({ owner, repo });
    return data;
  } catch (e: any) {
    if (e.status === 404) return null;
    throw e;
  }
};

export const deleteGithubRepo = async (token: string, owner: string, repo: string) => {
  const octokit = new Octokit({ auth: token });
  await octokit.rest.repos.delete({ owner, repo });
};
