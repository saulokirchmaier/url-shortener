import { Controller, Post, Body, Get } from '@nestjs/common';
import { ShortenerService } from './shortener.service';
import { CreateShortenerDto } from './dto/create-shortener.dto';

@Controller('shortener')
export class ShortenerController {
  constructor(private readonly shortenerService: ShortenerService) {}

  @Post()
  create(@Body() createShortenerDto: CreateShortenerDto) {
    return this.shortenerService.create(createShortenerDto);
  }

  @Get('find')
  find() {
    return this.shortenerService.find();
  }
}
