export default interface IPlaylistCollaborationService {
  /**
   * Adds collaborators to a playlist.
   * @param id - The ID of the playlist.
   * @param collaboratorIds - An array of user IDs to be added as collaborators.
   * @returns A promise that resolves when collaborators are added.
   */
  addCollaborators(id: string, collaboratorIds: string[]): Promise<void>;

  /**
   * Removes collaborators from a playlist.
   * @param id - The ID of the playlist.
   * @param collaboratorIds - An array of user IDs to be removed as collaborators.
   * @returns A promise that resolves when collaborators are removed.
   */
  removeCollaborators(id: string, collaboratorIds: string[]): Promise<void>;
}
