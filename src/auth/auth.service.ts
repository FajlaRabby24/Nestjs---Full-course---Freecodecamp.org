import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { ArtistsService } from '../artists/artists.service.js';
import { CreateUserDTO } from '../users/dto/create-user.dto.js';
import { User } from '../users/user.entity.js';
import { UsersService } from '../users/users.service.js';
import { LoginDto } from './dto/login.dto.js';
import { PayloadType } from './types.js';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private artistsService: ArtistsService,
  ) {}

  //* signup
  signup(userDTO: CreateUserDTO): Promise<User> {
    return this.userService.create(userDTO);
  }

  // *login
  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.userService.findOne(loginDto.email);

    const isMatchPass = await bcrypt.compare(loginDto.password, user.password);

    if (!isMatchPass) {
      throw new UnauthorizedException("Password doesn't match!");
    }

    const artist = await this.artistsService.findArtist(user.id);

    const payload: PayloadType = {
      email: user.email,
      userId: user.id,
    };
    if (artist) {
      payload.artistId = artist.id;
    }

    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
