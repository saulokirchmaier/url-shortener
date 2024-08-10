import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Shortener } from './entities/shortener.entity';
import { CreateShortenerDto } from './dto/create-shortener.dto';
import { isValidUrl } from 'src/utils/validate-url';
import { generateShorterUrl } from 'src/utils/generate-shorter-url';
import { UpdateShortenerDto } from './dto/update-shortener.dto';

@Injectable()
export class ShortenerService {
  constructor(
    @InjectRepository(Shortener)
    private readonly shortenerRepository: Repository<Shortener>,
  ) {}

  async create({ url }: CreateShortenerDto, request: any): Promise<string> {
    try {
      if (!isValidUrl(url)) {
        throw new BadRequestException('Invalid URL');
      }

      const token = generateShorterUrl(6);

      const shortener: Shortener = new Shortener();

      shortener.original_url = url;
      shortener.shorter_url = token;
      shortener.accesses = 0;

      if (request.user) {
        shortener.userId = request.user.payload.id;
      }

      await this.shortenerRepository.save(shortener);

      const shorter_url = `${process.env.LOCALHOST_URL}${token}`;

      return shorter_url;
    } catch (error) {
      console.log(error);

      throw new BadRequestException('Please repeat operation');
    }
  }

  async findOne(shorter_url: string): Promise<string> {
    try {
      const shortenerUrl = await this.shortenerRepository.findOneBy({
        shorter_url,
      });

      if (!shortenerUrl) {
        throw new NotFoundException('Url not found');
      }

      if (shortenerUrl.deleted_at) {
        throw new BadRequestException('Url deleted');
      }

      shortenerUrl.accesses = shortenerUrl.accesses + 1;

      this.shortenerRepository.save(shortenerUrl);

      return shortenerUrl.original_url;
    } catch (error) {
      throw error;
    }
  }

  async find(request: any): Promise<Array<Shortener>> {
    try {
      const userId = request.user.payload.id;

      const shorter_urls = await this.shortenerRepository.find({
        where: {
          userId,
          deleted_at: IsNull(),
        },
      });

      return shorter_urls;
    } catch (error) {
      throw error;
    }
  }

  async update(
    shorter_url: string,
    { url }: UpdateShortenerDto,
    request: any,
  ): Promise<string> {
    try {
      const shortenerUrl = await this.shortenerRepository.findOneBy({
        shorter_url,
      });

      if (!shortenerUrl) {
        throw new NotFoundException('Url not found');
      }

      if (shortenerUrl.deleted_at) {
        throw new BadRequestException('Url deleted');
      }

      if (!isValidUrl(url)) {
        throw new BadRequestException('Invalid URL');
      }

      if (shortenerUrl.userId !== request.user.payload.id) {
        throw new UnauthorizedException('Unauthorized');
      }

      shortenerUrl.original_url = url;
      shortenerUrl.updated_at = new Date();

      this.shortenerRepository.save(shortenerUrl);

      return shortenerUrl.original_url;
    } catch (error) {
      throw error;
    }
  }

  async delete(shorter_url: string, request: any): Promise<string> {
    try {
      const shortenerUrl = await this.shortenerRepository.findOneBy({
        shorter_url,
      });

      if (!shortenerUrl) {
        throw new NotFoundException('Url not found');
      }

      if (shortenerUrl.deleted_at) {
        throw new BadRequestException('Url deleted');
      }

      if (shortenerUrl.userId !== request.user.payload.id) {
        throw new UnauthorizedException('Unauthorized');
      }

      shortenerUrl.deleted_at = new Date();

      await this.shortenerRepository.save(shortenerUrl);

      return;
    } catch (error) {
      throw error;
    }
  }
}
