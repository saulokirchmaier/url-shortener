import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';
import { ShortenerModule } from './shortener/shortener.module';
import { Shortener } from './shortener/entities/shortener.entity';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ShortenerModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      password: process.env.DATABASE_PASSWORD,
      username: process.env.DATABASE_USER,
      entities: [User, Shortener],
      database: process.env.DATABASE_NAME,
      synchronize: true,
      logging: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
