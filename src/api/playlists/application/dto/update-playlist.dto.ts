import { IsOptional, IsString, Length } from 'class-validator';

/**
 * Data transfer object for updating a playlist.
 * This class allows for optional updates to the playlist's name and description.
 * If provided, the name must be between 3 and 20 characters, and the description must be between 6 and 20 characters.
 *
 * @example
 * const updateDto = new UpdatePlaylistDto();
 * updateDto.name = 'New Playlist Name';
 * updateDto.description = 'Updated description for the playlist.';
 */
export default class UpdatePlaylistDto {
  /**
   * The name of the playlist.
   * @optional
   * @minLength 3
   * @maxLength 20
   */
  @IsString()
  @IsOptional()
  @Length(3, 20)
  name?: string;

  /**
   * The description of the playlist.
   * @optional
   * @minLength 6
   * @maxLength 20
   */
  @IsString()
  @IsOptional()
  @Length(6, 20)
  description?: string;
}
