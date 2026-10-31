interface LoginCredentials {
  email: string;
  password: string;
}

export const login = (credentials: LoginCredentials) => {
  console.log(credentials);
  return {
    accessToken: '',
    refreshToken: '',
  };
};
