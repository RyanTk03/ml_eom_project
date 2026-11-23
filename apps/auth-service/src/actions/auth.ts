import bcrypt from "bcrypt";
import { AuthDetails } from "../models/AuthDetails";
import InvalidAuthCredentials from "../errors/InvalidAuthCredentials";
import { decode, encode } from "../libs/tokens-manager";
import { LoginRequestBody, RegisterRequestBody } from "@ml-eom/shared-types/requests-bodies/auth-service";
import InvalidRefreshToken from "../errors/InvalidRefreshToken";
import InvalidAccessToken from "../errors/InvalidAccessToken";
import PasswordConfirmationError from "../errors/PasswordConfirmationError";
import { createUser } from "../clients/user";

export const login = async (credentials: LoginRequestBody) => {
  const authDetails = await AuthDetails.findOne({ email: credentials.email });

  if (!authDetails || !bcrypt.compareSync(credentials.password, authDetails?.password ?? "")) {
    throw new InvalidAuthCredentials();
  }

  const tokens = encode({ email: authDetails.email, role: authDetails.role });

  return {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  };
};

export const logout = async (refreshToken?: string) => {
  if (!refreshToken) {
    throw new InvalidRefreshToken();
  }

  const decoded = decode(refreshToken, 'refresh');

  const authDetails = await AuthDetails.findOne({
    email: decoded.sub,
    refreshTokenId: decoded.jti,
  });

  if (!authDetails) {
    throw new InvalidRefreshToken();
  }

  authDetails.refreshTokenId = null;
  await authDetails.save();
}

export const refresh = async (refreshToken?: string) => {
  if (!refreshToken) {
    throw new InvalidRefreshToken();
  }

  const decoded = decode(refreshToken, 'refresh');

  const authDetails = await AuthDetails.findOne({
    email: decoded.sub,
    refreshTokenId: decoded.jti,
  });

  if (!authDetails) {
    throw new InvalidRefreshToken();
  }

  const tokens = encode({
    email: authDetails.email,
    role: authDetails.role,
  });

  authDetails.refreshTokenId = tokens.artifacts.jwtid;
  await authDetails.save();

  return {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  };
}

export const getSession = async (accessToken?: string) => {
  if (!accessToken) {
    throw new InvalidAccessToken();
  }

  const decoded = decode(accessToken, 'access');

  const authDetails = await AuthDetails.findOne({
    email: decoded.data.email,
  });

  if (!authDetails) {
    throw new InvalidAccessToken();
  }

  return authDetails.toObject();
}

export const register = async (requestAuthDetails: RegisterRequestBody) => {
  if (requestAuthDetails.password !== requestAuthDetails.confirmPassword) {
    throw new PasswordConfirmationError();
  }

  const userResquestResponse = await createUser();

  const authDetails = new AuthDetails();

  authDetails.email = requestAuthDetails.email;
  authDetails.password = bcrypt.hashSync(requestAuthDetails.password, 10);
  authDetails.userId = userResquestResponse.data.user._id;

  await authDetails.save();

  return authDetails.toObject();
}
