import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ArtistsModule } from '../artists/artists.module.js';
import { UsersModule } from '../users/users.module.js';
import { AUTH_CONSTANTS } from './auth.constants.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { JwtStrategy } from './JwtStrategy.js';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: AUTH_CONSTANTS.SECRET,
      signOptions: {
        expiresIn: '1d',
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ArtistsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, PassportModule],
})
export class AuthModule {}
