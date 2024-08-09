import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateShortenerDto {
  @IsNotEmpty()
  @IsString({ message: 'Please provide URL' })
  @IsUrl()
  url: string;
}
