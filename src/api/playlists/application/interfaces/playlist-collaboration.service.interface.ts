import { User } from 'src/api/users/domain/models/user.model';

export default interface IPlaylistCollaborationService {
  /**
   * Adds collaborators to a playlist.
   * @param id - The ID of the playlist.
   * @param ownerId - The ID of the owner of the playlist.
   * @param collaboratorId - ID of user to be added as collaborators.
   * @returns A promise that resolves when collaborators are added.
   */
  addCollaborator(
    id: string,
    ownerId: string,
    collaboratorId: string,
  ): Promise<void>;

  /**
   * Removes collaborators from a playlist.
   * @param id - The ID of the playlist.
   * @param ownerId - The ID of the owner of the playlist.
   * @param collaboratorId - ID of user to be removed as collaborators.
   * @returns A promise that resolves when collaborators are removed.
   */
  removeCollaborator(
    id: string,
    ownerId: string,
    collaboratorId: string,
  ): Promise<void>;

  /**
   * Retrieves the list of collaborators for a specific playlist.
   * @param id - The ID of the playlist.
   * @param requestingUserId - The ID of the user requesting the collaborator list.
   * @returns A promise that resolves with an array of `User` objects, representing the collaborators of the playlist.
   */
  getCollaborators(id: string, requestingUserId: string): Promise<User[]>;

  /**
   * Removes a user from the list of collaborators for the given owner's playlists.
   * @param ownerId - The ID of the owner of the playlists.
   * @param friendId - The ID of the user to be removed as a collaborator.
   * @returns A promise that resolves when the user is removed from all playlists they were collaborating on.
   */
  removeUserFromCollaboratorsForOwner(
    ownerId: string,
    friendId: string,
  ): Promise<void>;
}
