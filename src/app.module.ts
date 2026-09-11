import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { Artist } from './artists/artists.entity.js';
import { ArtistsModule } from './artists/artists.module.js';
import { AuthModule } from './auth/auth.module.js';
import { LoggerMiddleware } from './common/middleware/logger.middleware.js';
import { DevConfigService } from './common/providers/DevConfigService.js';
import { Playlist } from './playlists/playlists.entity.js';
import { PlayListModule } from './playlists/playlists.module.js';
import { Song } from './songs/song.entity.js';
import { SongsController } from './songs/songs.controller.js';
import { SongsModule } from './songs/songs.module.js';
import { User } from './users/user.entity.js';
import { UsersModule } from './users/users.module.js';

const devConfig = {
  port: 3000,
};
const proConfig = {
  port: 5000,
};

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres', // or 'mysql', etc.
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'my_db',
  entities: ['dist/**/*.entity.js'], // Compiled entities for production / runtime
  migrations: ['dist/migrations/*.js'],
  synchronize: false, // ALWAYS false when using migrations
};

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'spotify_clone_02',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      entities: [Song, User, Artist, Playlist],
      autoLoadEntities: true,
      synchronize: true,
    }),
    PlayListModule,
    SongsModule,
    AuthModule,
    UsersModule,
    ArtistsModule,
  ],
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
