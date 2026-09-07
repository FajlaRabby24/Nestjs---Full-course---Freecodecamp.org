import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from '../songs/song.entity.js';
import { User } from '../users/user.entity.js';
import { PlayListsController } from './playlists.controller.js';
import { Playlist } from './playlists.entity.js';
import { PlayListsService } from './playslists.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist, Song, User])],
  controllers: [PlayListsController],
  providers: [PlayListsService],
})
export class PlayListModule {}
