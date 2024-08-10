import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'User name', required: true })
  @IsString()
  @MinLength(2, { message: 'Name must have at least 2 characters' })
  @MaxLength(30, { message: 'Name must have at most 30 characters' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'User email', required: true })
  @IsEmail(null, { message: 'Please provide valid Email' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'User password', required: true })
  @IsString()
  @IsNotEmpty()
  password: string;
}
