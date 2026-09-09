import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from '../artists/artists.entity.js';
import { connection } from '../common/constants/connection.js';
import { Song } from './song.entity.js';
import { SongsController } from './songs.controller.js';
import { SongsService } from './songs.service.js';

const mockService = {
  findAll() {
    return [{ id: 1, title: 'Lasting lover', artists: ['Siagla'] }];
  },
};
@Module({
  imports: [
    TypeOrmModule.forFeature([Song, Artist]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [SongsController],
  providers: [
    SongsService,
    //* standerd provider
    // {
    //   provide: SongsService,
    //   useClass: SongsService,
    // },
    // {
    //   provide: SongsService,
    //   useValue: mockService,
    // },
    {
      provide: 'CONNECTION',
      useValue: connection,
    },
  ],
})
export class SongsModule {}

// 3:45
