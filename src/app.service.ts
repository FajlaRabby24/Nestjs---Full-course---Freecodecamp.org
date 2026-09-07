import { Inject, Injectable } from '@nestjs/common';
import { DevConfigService } from './common/providers/DevConfigService.js';

@Injectable()
export class AppService {
  constructor(
    private devConfigService: DevConfigService,
    @Inject('CONFIG')
    private config: { port: string },
  ) {}
  getHello(): string {
    return `Hello i am learing Nest.js ${this.devConfigService.getDBHOST()} ${this.config.port}`;
  }
}
