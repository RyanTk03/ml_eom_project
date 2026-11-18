export class OrganizationNotFound extends Error {

  constructor(id: string) {
    super(`Organization ${id} not found`);
  }
}