import { Module } from '@nestjs/common';
import { connection } from '../common/constants/connection.js';
import { SongsController } from './songs.controller.js';
import { SongsService } from './songs.service.js';

const mockService = {
  findAll() {
    return [{ id: 1, title: 'Lasting lover', artists: ['Siagla'] }];
  },
};
@Module({
  // imports: [SongsService],
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
