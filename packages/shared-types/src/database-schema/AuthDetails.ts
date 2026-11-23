export default interface AuthDetailsSchema {
  _id: string;
  email: string;
  password: string;
  emailVerified: boolean;
  role: string;
  refreshTokenId?: string | null;
  authProvider: "local";
  userId?: string;
}
