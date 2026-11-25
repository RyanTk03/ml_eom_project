import type { Project } from "../../database-schema";

export default interface GetMyProjectsResponseBody {
  data: {
    projects: Project[];
  };
}
