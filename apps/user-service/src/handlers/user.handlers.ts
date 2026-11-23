import { createUser, updateUser } from '../actions/user.actions';
import { defineHandlers } from '../libs/handlersUtils';

const userHandlers = defineHandlers({
  create: async (req, res) => {
    const user = await createUser();

    res.send({ data: { user } });
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
});

export default userHandlers;
