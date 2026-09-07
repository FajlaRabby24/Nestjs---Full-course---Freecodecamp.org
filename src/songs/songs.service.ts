import { Inject, Injectable } from '@nestjs/common';
import { type Connection } from '../common/constants/connection.js';

@Injectable()
export class SongsService {
  constructor(@Inject('CONNECTION') private connection: Connection) {
    console.log(
      `This is connection string: ${this.connection.CONNECTION_STRING}`,
    );
  }

  private readonly songs = [];
  findAll() {
    // return 'This action returns all songs from service file';
    return this.songs;
  }
}
