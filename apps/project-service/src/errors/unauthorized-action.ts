export default class UnauthorizedAction extends Error {
  
  constructor() {
    super("Action not authorized action requested.");
  }
}