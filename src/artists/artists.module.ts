import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistsController } from './artists.controller.js';
import { Artist } from './artists.entity.js';
import { ArtistsService } from './artists.service.js';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  imports: [TypeOrmModule.forFeature([Artist])],
  exports: [ArtistsService],
})
export class ArtistsModule {}
