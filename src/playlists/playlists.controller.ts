import { Body, Controller, Post } from '@nestjs/common';
import { CreatePlayListDto } from './dto/create-playlist.dto.js';
import { Playlist } from './playlists.entity.js';
import { PlayListsService } from './playslists.service.js';

@Controller('playlists')
export class PlayListsController {
  constructor(private playListService: PlayListsService) {}

  @Post()
  create(@Body() playlistDto: CreatePlayListDto): Promise<Playlist> {
    console.log('dto', playlistDto);
    return this.playListService.create(playlistDto);
  }
}
