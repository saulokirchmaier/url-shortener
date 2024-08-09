import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shortener } from './entities/shortener.entity';
import { CreateShortenerDto } from './dto/create-shortener.dto';
import { isValidUrl } from 'src/utils/validate-url';
import { generateShorterUrl } from 'src/utils/generate-shorter-url';

@Injectable()
export class ShortenerService {
  constructor(
    @InjectRepository(Shortener)
    private readonly shortenerRepository: Repository<Shortener>,
  ) {}

  async create({ url }: CreateShortenerDto) /*: Promise<string> */ {
    try {
      if (!isValidUrl(url)) {
        throw new BadRequestException('Invalid URL');
      }

      const token = generateShorterUrl(6);

      const shortener: Shortener = new Shortener();

      shortener.original_url = url;
      shortener.shorter_url = token;

      await this.shortenerRepository.save(shortener);

      const shorter_url = `${process.env.LOCALHOST_URL}${token}`;

      return shorter_url;
    } catch (error) {
      throw new BadRequestException('Please repeat operation');
    }
  }

  async findOne(shorter_url): Promise<string> {
    try {
      const shortenerUrl = await this.shortenerRepository.findOneBy({
        shorter_url,
      });

      return shortenerUrl.original_url;
    } catch (error) {
      throw error;
    }
  }

  async find(): Promise<Array<Shortener>> {
    try {
      const shorter_urls = await this.shortenerRepository.find();

      return shorter_urls;
    } catch (error) {
      throw error;
    }
  }
}
