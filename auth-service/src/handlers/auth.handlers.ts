//import { login } from '../actions/auth';
import { defineHandlers } from '../libs/handlersUtils';

const authHandlers = defineHandlers({
  login: async (req, res) => {
    // const { accessToken, refreshToken } = login(req.body);

    res.send({ /* accessToken, refreshToken */ });
  },

  getSession: async (req, res) => {
    res.send([]);
  },

  refreshSession: (req, res) => {
    res.send('updated');
  },

  logout: (req, res) => {
    res.send('updated');
  },
});

export default authHandlers;
