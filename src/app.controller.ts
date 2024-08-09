import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':shorter_url')
  findOne(@Param('shorter_url') shorter_url: string) {
    return this.appService.findOne(shorter_url);
  }
}
