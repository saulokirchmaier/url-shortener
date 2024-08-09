import { Module } from '@nestjs/common';
import { Shortener } from './entities/shortener.entity';
import { ShortenerController } from './shortener.controller';
import { ShortenerService } from './shortener.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Shortener])],
  controllers: [ShortenerController],
  providers: [ShortenerService],
  exports: [ShortenerService],
})
export class ShortenerModule {}
