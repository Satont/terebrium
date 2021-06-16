import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import config from '../modules/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { ChannelsModule } from './channels/channels.module';
import { session } from 'telegraf';
import { TitlesModule } from './titles/titles.module';
import { PrismaModule } from './prisma/prisma.module';
import { TwitchModule } from './twitch/twitch.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: config.telegram.token,
      middlewares: [session()],
    }),
    ChannelsModule,
    CategoriesModule,
    TitlesModule,
    PrismaModule,
    TwitchModule,
    AuthModule,
  ],
  controllers: [],
  providers: [AppController, AppService],
  exports: [],
})
export class AppModule {}
