import { IsNotEmpty, IsString, Length } from 'class-validator';

/**
 * Data Transfer Object (DTO) for creating a new user.
 *
 * This class defines the validation rules for creating a user, ensuring the username
 * and name meet specific requirements. It uses class-validator decorators to enforce
 * validation rules.
 */
export default class CreateUserDto {
  /**
   * The username of the user.
   * Must be a string and non-empty, with a length between 3 and 20 characters.
   *
   * @type {string}
   * @example 'john_doe'
   */
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  username: string;

  /**
   * The full name of the user.
   * Must be a string and non-empty, with a length between 6 and 20 characters.
   *
   * @type {string}
   * @example 'John Doe'
   */
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  name: string;
}
