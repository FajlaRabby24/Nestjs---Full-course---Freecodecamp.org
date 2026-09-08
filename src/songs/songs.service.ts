import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { Artist } from '../artists/artists.entity.js';
import { CreateSongDto } from './dto/create-song-dto.js';
import { UpdateSongDto } from './dto/update-song.dto.js';
import { Song } from './song.entity.js';

@Injectable()
export class SongsService {
  constructor(
    // @Inject('CONNECTION') private connection: Connection
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  // * create song
  async create(songDto: CreateSongDto): Promise<Song> {
    const song = new Song();
    song.title = songDto.title;
    // song.artists = songDto.artists;
    song.duration = songDto.duration;
    song.lyrics = songDto.lyrics;
    song.releasedDate = songDto.releasedDate;

    // * find all artists on the based on ids
    const artists = await this.artistsRepository.findBy({
      id: In(songDto.artists),
    });
    //* set the relation with artist and songs
    song.artists = artists;
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
    const song = new Song();
    song.title = updateSongDto.title;
    song.duration = updateSongDto.duration;
    song.lyrics = updateSongDto.lyrics;
    song.releasedDate = updateSongDto.releasedDate;

    if (updateSongDto.artists) {
      song.artists = await this.artistsRepository.findBy({
        id: In(updateSongDto.artists),
      });
    }

    const result = await this.songsRepository.update(id, song);

    return result;
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    const queryBuilder = this.songsRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.releasedDate', 'DESC');
    return paginate<Song>(queryBuilder, options);
  }
}
