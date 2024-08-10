import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateShortenerDto {
  @ApiProperty({ description: 'URL to by shortened', required: true })
  @IsNotEmpty()
  @IsString({ message: 'Please provide URL' })
  @IsUrl()
  url: string;
}
