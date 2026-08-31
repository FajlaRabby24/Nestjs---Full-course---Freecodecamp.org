import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {
  private readonly songs = [];
  findAll() {
    // return 'This action returns all songs from service file';
    return this.songs;
  }
}
