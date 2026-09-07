import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateSongDto } from './dto/create-song-dto.js';
import { UpdateSongDto } from './dto/update-song.dto.js';
import { Song } from './song.entity.js';

@Injectable()
export class SongsService {
  constructor(
    // @Inject('CONNECTION') private connection: Connection
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
  ) {}

  // * create song
  async create(songDto: CreateSongDto): Promise<Song> {
    const song = new Song();
    song.title = songDto.title;
    song.artists = songDto.artists;
    song.duration = songDto.duration;
    song.lyrics = songDto.lyrics;
    song.releasedDate = songDto.releasedDate;

    const result = await this.songsRepository.save(song);
    return result;
  }

  findAll(): Promise<Song[]> {
    const allSongs = this.songsRepository.find();
    return allSongs;
  }

  async findById(id: number): Promise<Song> {
    const song = await this.songsRepository.findOneBy({ id });
    if (!song) {
      throw new BadRequestException('Song not found');
    }
    return song;
  }

  //* delete
  async remove(id: number): Promise<DeleteResult> {
    const result = await this.songsRepository.delete(id);
    if (!result.affected) {
      throw new BadRequestException('Song not found');
    }
    return result;
  }

  // update
  async update(
    id: number,
    updateSongDto: UpdateSongDto,
  ): Promise<UpdateResult> {
    const result = await this.songsRepository.update(id, updateSongDto);

    return result;
  }
}
