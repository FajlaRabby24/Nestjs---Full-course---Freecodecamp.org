import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { LoggerMiddleware } from './common/middleware/logger.middleware.js';
import { DevConfigService } from './common/providers/DevConfigService.js';
import { SongsController } from './songs/songs.controller.js';
import { SongsModule } from './songs/songs.module.js';

const devConfig = {
  port: 3000,
};
const proConfig = {
  port: 5000,
};
@Module({
  imports: [SongsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: DevConfigService,
      useClass: DevConfigService,
    },
    {
      provide: 'CONFIG',
      useFactory: () => {
        return process.env.NODE_ENV === 'development' ? devConfig : proConfig;
      },
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('songs'); // * option 1
    // consumer.apply(LoggerMiddleware).forRoutes({path: "songs", method: RequestMethod.POST}) // * option 2
    consumer.apply(LoggerMiddleware).forRoutes(SongsController); // * option 3
  }
}
