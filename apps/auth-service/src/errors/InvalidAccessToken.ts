export default class InvalidAccessToken extends Error {

  constructor() {
    super("Invalid access token.")
  }
}