import { defineHandlers } from '../libs/handlersUtils';

const userHandlers = defineHandlers({
  create: async (req, res) => {
    res.send();
  },

  search: async (req, res) => {
    res.send([]);
  },

  getById: (req, res) => {
    res.send('updated');
  },

  updateById: (req, res) => {
    res.send('updated');
  },
});

export default userHandlers;
