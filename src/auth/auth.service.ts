import { Injectable, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { CreateUserDTO } from '../users/dto/create-user.dto.js';
import { User } from '../users/user.entity.js';
import { UsersService } from '../users/users.service.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  //* signup
  signup(userDTO: CreateUserDTO): Promise<User> {
    return this.userService.create(userDTO);
  }

  // *login
  async login(loginDto: LoginDto): Promise<User> {
    const user = await this.userService.findOne(loginDto.email);

    const isMatchPass = await bcrypt.compare(loginDto.password, user.password);

    if (!isMatchPass) {
      throw new UnauthorizedException("Password doesn't match!");
    }
    user.password = '';
    return user;
  }
}
