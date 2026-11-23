import type { LoginRequestBody, RegisterRequestBody } from '@ml-eom/shared-types/requests-bodies/auth-service';
import { getSession, login, logout, refresh, register } from '../actions/auth';
import { defineHandlers } from '../libs/handlersUtils';
import { buildRefreshTokenCookieOptions } from '../libs/cookies';

const authHandlers = defineHandlers({
  register: async (req, res) => {
    const authDetails = await register(req.body as RegisterRequestBody);

    return res.send({ data: { authDetails } });
  },

  login: async (req, res) => {
    const { accessToken, refreshToken } = await login(req.body as LoginRequestBody);

    return res
      .setCookie('refreshToken', refreshToken, buildRefreshTokenCookieOptions())
      .send({ data: { accessToken } });
  },

  getSession: async (req, res) => {
    const session = await getSession(req.headers.authorization?.replace('Bearer ', ''));

    res.send({ data: { session } });
  },

  refreshSession: async (req, res) => {
    const tokens = await refresh(req.cookies.refreshToken);
  
    res
    .setCookie('refreshToken', tokens.refreshToken, buildRefreshTokenCookieOptions())
    .send({ data: { accessToken: tokens.accessToken } });
  },

  logout: async (req, res) => {
    await logout();

    return res
    .clearCookie('refreshToken', { path: '/api/auth' })
    .code(204)
    .send();
  },
});

export default authHandlers;
