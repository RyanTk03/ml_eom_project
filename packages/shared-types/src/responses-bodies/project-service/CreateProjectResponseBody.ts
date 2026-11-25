import type { Project } from "../../database-schema";

export default interface CreateProjectResponseBody {
  data: {
    project: Project;
  };
}
