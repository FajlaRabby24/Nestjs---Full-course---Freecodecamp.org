import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto.js';
import { User } from './user.entity.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  // create user
  async create(userDto: CreateUserDTO): Promise<User> {
    const salt = await bcrypt.genSalt();
    userDto.password = await bcrypt.hash(userDto.password, salt);

    const user = await this.userRepo.save(userDto);
    user.password = '';
    return user;
  }

  // * find one
  async findOne(email: string): Promise<User> {
    const user = await this.userRepo.findOneBy({ email });
    if (!user) {
      throw new UnauthorizedException('Could not find user!');
    }
    return user;
  }

  //* find by id
  async findById(userId: number): Promise<User> {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) {
      throw new UnauthorizedException('User not found!');
    }
    return user;
  }

  //* disable 2fa
  async disable2FA(userId: number): Promise<UpdateResult> {
    return this.userRepo.update(
      { id: userId },
      {
        enable2FA: false,
        twoFASecret: '',
      },
    );
  }

  //* update secret key
  async updateSecretKey(
    userId: number,
    secretKey: string,
  ): Promise<UpdateResult> {
    return this.userRepo.update(
      { id: userId },
      {
        twoFASecret: secretKey,
        enable2FA: true,
      },
    );
  }
}
