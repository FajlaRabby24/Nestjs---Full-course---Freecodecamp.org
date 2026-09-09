import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { Pagination } from 'nestjs-typeorm-paginate';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ArtistJwtGuard } from '../auth/artists-jwt-guard.js';
import { PayloadType } from '../auth/types.js';
import { CreateSongDto } from './dto/create-song-dto.js';
import { UpdateSongDto } from './dto/update-song.dto.js';
import { Song } from './song.entity.js';
import { SongsService } from './songs.service.js';

export interface AuthenticatedRequest extends Request {
  user: PayloadType;
}

@Controller('songs')
export class SongsController {
  constructor(private songService: SongsService) {}

  //* create song
  @Post()
  @UseGuards(ArtistJwtGuard)
  create(
    @Body() createSongDto: CreateSongDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<Song> {
    return this.songService.create(createSongDto);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit = 10,
  ): Promise<Pagination<Song>> {
    limit = limit > 100 ? 100 : limit;

    return this.songService.paginate({
      page,
      limit,
    });
  }

  @Get(':id')
  findById(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<Song> {
    return this.songService.findById(id);
  }

  @Delete(':id')
  remove(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<DeleteResult> {
    return this.songService.remove(id);
  }

  @Patch(':id')
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateSongDto: UpdateSongDto,
  ): Promise<UpdateResult> {
    return this.songService.update(id, updateSongDto);
  }
}
