import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './artists.entity.js';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistsRepo: Repository<Artist>,
  ) {}

  //* find one artist by user id
  async findArtist(userId: number): Promise<Artist | null> {
    const artist = await this.artistsRepo.findOneBy({ user: { id: userId } });
    return artist;
  }
}
