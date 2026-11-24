import { createUser, getAuthenticatedUser, updateAuthenticatedUser, updateUser } from '../actions/user.actions';
import { defineHandlers } from '../libs/handlersUtils';

const userHandlers = defineHandlers({
  create: async (req, res) => {
    const user = await createUser();

    return res.send({ data: { user } });
  },

  me: async (req, res) => {
    const me = await getAuthenticatedUser(req.headers.authorization);

    return res.send({ data: { me } });
  },

  search: async (req, res) => {
    res.send([]);
  },

  getById: (req, res) => {
    res.send('updated');
  },

  updateById: async (req, res) => {
    const user = await updateUser(req.params.id, req.body);

    res.send({ data: { user } });
  },

  updateMe: async (req, res) => {
    const user = await updateAuthenticatedUser(req.body, req.headers.authorization);

    res.send({ data: { user } });
  },
});

export default userHandlers;
