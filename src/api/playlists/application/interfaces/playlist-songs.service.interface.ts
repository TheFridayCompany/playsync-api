export default interface IPlaylistSongsService {
  /**
   * Adds songs to a playlist.
   * @param id - The ID of the playlist.
   * @param songIds - An array of song IDs to be added.
   * @returns A promise that resolves when the songs are added.
   */
  addSongs(id: string, songIds: number[]): Promise<void>;

  /**
   * Removes songs from a playlist.
   * @param id - The ID of the playlist.
   * @param songIds - An array of song IDs to be removed.
   * @returns A promise that resolves when the songs are removed.
   */
  removeSongs(id: string, songIds: number[]): Promise<void>;
}
