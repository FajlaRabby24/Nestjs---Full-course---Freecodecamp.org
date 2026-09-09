import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from '../users/dto/create-user.dto.js';
import { User } from '../users/user.entity.js';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() userDTO: CreateUserDTO): Promise<User> {
    return this.authService.signup(userDTO);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.login(loginDto);
  }
}
