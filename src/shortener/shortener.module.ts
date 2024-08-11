import { Module } from '@nestjs/common';
import { Shortener } from './entities/shortener.entity';
import { ShortenerController } from './shortener.controller';
import { ShortenerService } from './shortener.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shortener]), AuthModule],
  controllers: [ShortenerController],
  providers: [ShortenerService, AuthService],
  exports: [ShortenerService],
})
export class ShortenerModule {}
