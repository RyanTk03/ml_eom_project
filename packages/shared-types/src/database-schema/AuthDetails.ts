export default interface AuthDetailsSchema {
  email: string;
  password: string;
  emailVerified: boolean;
  role: string;
  refreshTokenId?: string | null;
}
