import { IsNotEmpty, IsString, Length } from 'class-validator';

/**
 * DTO (Data Transfer Object) for searching songs.
 * It defines the structure and validation rules for the song search query.
 */
export default class SongSearchDto {
  /**
   * The search query string used to find songs.
   * The query must be a string between 3 and 200 characters long.
   * This field is required and cannot be empty.
   */
  @IsString()
  @IsNotEmpty()
  @Length(3, 200)
  query: string;
}
