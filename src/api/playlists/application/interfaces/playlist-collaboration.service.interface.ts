export default interface IPlaylistCollaborationService {
  /**
   * Adds collaborators to a playlist.
   * @param id - The ID of the playlist.
   * @param collaboratorIds - An array of user IDs to be added as collaborators.
   * @returns A promise that resolves when collaborators are added.
   */
  addCollaborators(id: string, collaboratorIds: string[]): Promise<void>;

  /**
   * Sends a request to collaborate on a playlist.
   * @param id - The ID of the playlist.
   * @param collaboratorId - The ID of the user requesting collaboration.
   * @returns A promise that resolves when the request is sent.
   */
  requestCollaboration(id: string, collaboratorId: string): Promise<void>;

  /**
   * Removes collaborators from a playlist.
   * @param id - The ID of the playlist.
   * @param collaboratorIds - An array of user IDs to be removed as collaborators.
   * @returns A promise that resolves when collaborators are removed.
   */
  removeCollaborators(id: string, collaboratorIds: string[]): Promise<void>;

  /**
   * Accepts a collaboration request for a playlist.
   * @param id - The ID of the playlist.
   * @param collaboratorId - The ID of the user whose request is being accepted.
   * @returns A promise that resolves when the collaborator is added.
   */
  acceptCollaborator(id: string, collaboratorId: string): Promise<void>;

  /**
   * Rejects a collaboration request for a playlist.
   * @param id - The ID of the playlist.
   * @param collaboratorId - The ID of the user whose request is being rejected.
   * @returns A promise that resolves when the request is rejected.
   */
  rejectCollaborator(id: string, collaboratorId: string): Promise<void>;
}
