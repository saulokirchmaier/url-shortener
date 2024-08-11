import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserLoginDto {
  @ApiProperty({ description: 'User email', required: true })
  @IsEmail(null, { message: 'Please provide valid Email' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'User password', required: true })
  @IsString()
  @IsNotEmpty()
  password: string;
}
