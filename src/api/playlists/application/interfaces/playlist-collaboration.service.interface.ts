import { User } from 'src/api/users/domain/models/user.model';

export default interface IPlaylistCollaborationService {
  /**
   * Adds collaborators to a playlist.
   * @param id - The ID of the playlist.
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
   * @param collaboratorId - ID of user to be removed as collaborators.
   * @returns A promise that resolves when collaborators are removed.
   */
  removeCollaborator(
    id: string,
    ownerId: string,
    collaboratorId: string,
  ): Promise<void>;

  getCollaborators(id: string, ownerId: string): Promise<User[]>;
}
