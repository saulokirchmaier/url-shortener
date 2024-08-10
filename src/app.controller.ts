import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('main')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiParam({
    name: 'shorter_url',
    type: 'string',
    example: 'Se48&g',
  })
  @Get(':shorter_url')
  findOne(@Param('shorter_url') shorter_url: string) {
    return this.appService.findOne(shorter_url);
  }
}
