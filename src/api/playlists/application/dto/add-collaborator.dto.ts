import { IsString } from 'class-validator';

/**
 * Data transfer object for adding a collaborator.
 * This class defines the structure of the request body required
 * to add a new collaborator to a project or resource.
 */
export default class AddCollaboratorDto {
  /**
   * The unique identifier (ID) of the collaborator to be added.
   *
   * This should be a string representing the collaborator's user ID.
   * It is validated to ensure it is a string.
   *
   * @example "60b8b24185b3bc001c8f532f"
   *
   * @type {string}
   * @memberof AddCollaboratorDto
   */
  @IsString()
  collaboratorId: string;
}
