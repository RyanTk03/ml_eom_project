export default class InvalidAuthCredentials extends Error{

  constructor() {
    super("Invalid Email or Password.")
  }
}