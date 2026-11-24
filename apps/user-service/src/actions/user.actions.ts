import { getSession } from "../clients/auth";
import InvalidAccessToken from "../errors/invalid-access-token";
import { UserNotFound } from "../errors/user-not-found";
import { User } from "../models/user.model";
import type { UserUpdateRequestBody } from "@ml-eom/shared-types/requests-bodies/user-service";

/**
 * Create new user in the database.
 *
 * @returns {UserDocument} new user created
 */
export const createUser = async () => {
  const user = new User();

  await user.save();

  return user.toObject();
};

interface UpdateUserData {
  // organizationToAdd: string;
  // organizationToRemove: string;
  firstName: string;
  lastName: string;
}

/**
 * Update user identified by `id` with data provided.
 *
 * @param id id of the user to update
 * @param data data to update user with
 * 
 * @returns {UserDocument} the updated user data
 */
export const updateUser = async (id: string, data: Partial<UpdateUserData>) => {
  const foundUser = await User.findById(id);

  if (!foundUser) {
    throw new UserNotFound(id);
  }

  // // Remove user from organization
  // if (data.organizationToRemove) {
  //   foundUser.organizations = foundUser.organizations.filter(organization => organization.id !== data.organizationToRemove)
  // }

  // // Add user to an organization
  // if (data.organizationToAdd) {
  //   const foundOrganization = await Organization.findById(data.organizationToAdd);

  //   if (!foundOrganization) {
  //     throw new OrganizationNotFound(data.organizationToAdd)
  //   }

  //   foundUser.organizations.push({
  //     id: data.organizationToAdd,
  //     name: foundOrganization.name,
  //     role: "PM",
  //   });
  // }

  return await User.findByIdAndUpdate(id, data);
}

export const updateAuthenticatedUser = async (data: UserUpdateRequestBody, authorizationHeader?: string) => {
  if (!authorizationHeader) {
    throw new InvalidAccessToken();
  }

  const response = (await getSession(authorizationHeader));
  console.log(response.data);
  const session = response.data.session
  const me = await User.findById(session.userId);

  if (!me) {
    throw new UserNotFound(session.userId);
  }
  me.lastName = data.lastName;
  me.firstName = data.firstName;

  me.save();
  return me;
}

export const getAuthenticatedUser = async (authorizationHeader?: string) => {
  if (!authorizationHeader) {
    throw new InvalidAccessToken();
  }

  const session = (await getSession(authorizationHeader)).data.session;
  const me = await User.findById(session.userId);

  return me?.toObject();
}

interface SearchFilter {
  firstName?: string;
  lastName?: string;
}

/**
 * Search for user corresponding to the criteria provided.
 *
 * @param filter filter used to search users
 *
 * @returns {UserDocument[]} users corresponding to the filter
 */
export const searchUser = async (filter: SearchFilter) => {
  return await User.find(filter);
}

/**
 * Retrives a user identified by its id.
 *
 * @param id id of the user to retrieve
 *
 * @returns {UserDocument} user corresponding to the id provided
 */
export const getUserById = async (id: string) => {
  const foundUser = await User.findById(id);

  if (!foundUser) {
    throw new UserNotFound(id);
  }

  return foundUser;
}

/**
 * Delete a user by its id.
 *
 * @param id id of the user to delete
 */
export const deleteUser = async (id: string) => {
  const foundUser = await User.findByIdAndDelete(id);

  if (!foundUser) {
    throw new UserNotFound(id);
  }
}
