import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { SongsService } from './songs.service.js';

@Controller('songs')
export class SongsController {
  constructor(private songService: SongsService) {}
  @Get()
  findAll() {
    try {
      return this.songService.findAll();
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

  @Get(':id')
  findById(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return `This action returns a #${typeof id} song`;
  }
}
