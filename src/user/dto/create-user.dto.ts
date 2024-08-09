import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2, { message: 'Name must have at least 2 characters' })
  @MaxLength(30, { message: 'Name must have at most 30 characters' })
  @IsNotEmpty()
  name: string;

  @IsEmail(null, { message: 'Please provide valid Email' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
