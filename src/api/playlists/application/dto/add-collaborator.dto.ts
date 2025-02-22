import { IsString } from 'class-validator';

export default class AddCollaboratorDto {
  @IsString()
  collaboratorId: string;

  @IsString()
  userId: string;
}
