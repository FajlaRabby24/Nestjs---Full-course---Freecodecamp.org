import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository, UpdateResult } from 'typeorm';
import { v4 as uuid4 } from 'uuid';
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
    const user = new User();
    user.firstName = userDto.firstName;
    user.lastName = userDto.lastName;
    user.email = userDto.email;
    user.apiKey = uuid4();

    const salt = await bcrypt.genSalt(); // 2.
    user.password = await bcrypt.hash(userDto.password, salt); // 3.

    const savedUser = await this.userRepo.save(user);
    savedUser.password = '';
    return savedUser;
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

  async findByApiKey(apiKey: string): Promise<User | null> {
    return this.userRepo.findOneBy({ apiKey });
  }
}
