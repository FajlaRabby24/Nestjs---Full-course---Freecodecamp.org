import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  /**
   * You can enable the seeding here
   */
  // const seedService = app.get(SeedService);
  // await seedService.seed();

  await app.listen(3000);
}
await bootstrap();
