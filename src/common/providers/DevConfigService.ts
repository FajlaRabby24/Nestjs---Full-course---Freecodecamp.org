import { Injectable } from '@nestjs/common';

@Injectable()
export class DevConfigService {
  DBHOST = 'localhost';
  getDBHOST() {
    return `Hello i am learing Nest.js ${this.DBHOST}`;
  }
}
