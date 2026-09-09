import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AUTH_CONSTANTS } from './auth.constants.js';
import { PayloadType } from './types.js';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: AUTH_CONSTANTS.SECRET,
    });
  }

  async validate(payload: PayloadType) {
    return {
      userId: payload.userId,
      email: payload.email,
      artistId: payload.artistId,
    };
  }
}
