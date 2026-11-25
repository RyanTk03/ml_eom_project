export default class UnauthenticatedAction extends Error {
  
  constructor() {
    super("You are not authorized.");
  }
}