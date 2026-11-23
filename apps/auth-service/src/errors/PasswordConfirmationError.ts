export default class PasswordConfirmationError extends Error {

  constructor() {
    super("Passord confirmation fails");
  }
}