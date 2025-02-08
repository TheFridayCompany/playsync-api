import Song from 'src/api/songs/domain/models/song.model';

export class Playlist {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public visibility: PlaylistVisibility,
    public userId: string,
    public createdAt: Date,
    public updatedAt: Date,
    public deletedAt: Date | null,
    public tracks: Song[] = [],
    public collaboratorIds: string[] = [],
  ) {}
}

export enum PlaylistVisibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
