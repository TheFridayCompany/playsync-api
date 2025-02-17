export class Playlist {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public visibility: PlaylistVisibility,
    public userId: string,
    public createdAt: Date,
    public updatedAt: Date,
    // TODO: embedded song
    public collaboratorIds: string[] = [],
  ) {}
}

export enum PlaylistVisibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
