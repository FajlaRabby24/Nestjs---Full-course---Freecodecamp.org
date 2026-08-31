import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller.js';

@Module({
  controllers: [SongsController]
})
export class SongsModule {}
