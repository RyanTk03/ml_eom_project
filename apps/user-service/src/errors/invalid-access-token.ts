export default class InvalidAccessToken extends Error {
  public readonly statusCode = 400;

  constructor() {
    super("Invalid access token")
  }
}