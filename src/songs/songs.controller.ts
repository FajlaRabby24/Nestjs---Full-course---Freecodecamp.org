import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';

@Controller('songs')
export class SongsController {
  @Get()
  findAll() {
    try {
      return 'This action returns all songs';
    } catch (error) {
      throw new HttpException(
        'server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }
}
