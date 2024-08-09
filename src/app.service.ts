import { Injectable } from '@nestjs/common';
import { ShortenerService } from './shortener/shortener.service';

@Injectable()
export class AppService {
  constructor(private readonly shortenerService: ShortenerService) {}

  async findOne(shorter_url: string): Promise<string> {
    return await this.shortenerService.findOne(shorter_url);
  }
}
