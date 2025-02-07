import { IsNotEmpty, IsString, Length } from 'class-validator';

export default class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  name: string;
}
