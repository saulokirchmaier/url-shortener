import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      password: process.env.DATABASE_PASSWORD,
      username: process.env.DATABASE_USER,
      entities: [],
      database: process.env.DATABASE_NAME,
      synchronize: true,
      logging: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
