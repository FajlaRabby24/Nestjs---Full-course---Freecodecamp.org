import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller.js';
import { SongsService } from './songs.service.js';

const mockService = {
  findAll() {
    return [{ id: 1, title: 'Lasting lover', artists: ['Siagla'] }];
  },
};
@Module({
  controllers: [SongsController],
  providers: [
    SongsService,
    // {
    //   provide: SongsService,
    //   useClass: SongsService,
    // },
    {
      provide: SongsService,
      useValue: mockService,
    },
  ],
})
export class SongsModule {}
