import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

const PORT = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.enableCors();

  await app.listen(PORT, () =>
    console.log(`Server is running on PORT ${PORT}`),
  );
}
bootstrap();
