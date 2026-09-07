import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Song } from '../songs/song.entity.js';
import { User } from '../users/user.entity.js';
import { CreatePlayListDto } from './dto/create-playlist.dto.js';
import { Playlist } from './playlists.entity.js';

@Injectable()
export class PlayListsService {
  constructor(
    @InjectRepository(Playlist) private playListRepo: Repository<Playlist>,

    @InjectRepository(Song) private songsRepo: Repository<Song>,

    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  // * create playlist
  async create(playListDto: CreatePlayListDto): Promise<Playlist> {
    const playList = new Playlist();
    playList.name = playListDto.name;

    const songs = await this.songsRepo.find({
      where: { id: In(playListDto.songs) },
    });
    playList.songs = songs;

    const user = await this.userRepo.findOneBy({ id: playListDto.user });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    playList.user = user;

    const result = await this.playListRepo.save(playList);

    return result;
  }
}
