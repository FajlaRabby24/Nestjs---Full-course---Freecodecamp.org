import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  /**
   * You can enable the seeding here
   */
  // const seedService = app.get(SeedService);
  // await seedService.seed();

  await app.listen(configService.getOrThrow('PORT'));
}
await bootstrap();
