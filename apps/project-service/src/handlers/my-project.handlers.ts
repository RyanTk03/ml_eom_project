import { listMyProjects } from "../actions/my-project.actions";
import { defineHandlers } from "../libs/handlersUtils"

const myProjectHandlers = defineHandlers({
  createProject: async (req, res) => {

  },

  listProjects: async (req, res) => {
    const projects = await listMyProjects(req.userToken);

    return res.send({ data: { projects } });
  },

  getOneOfMe: async (req, res) => {

  }
});

export default myProjectHandlers;
