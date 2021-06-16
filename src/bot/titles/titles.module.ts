import { forwardRef, Module } from '@nestjs/common';
import { ChannelsModule } from '../channels/channels.module';
import { PrismaModule } from '../prisma/prisma.module';
import { TwitchModule } from '../twitch/twitch.module';
import { TitlesService } from './titles.service';
import { TitlesUpdate } from './titles.update';

@Module({
  imports: [PrismaModule, TwitchModule, forwardRef(() => ChannelsModule)],
  providers: [TitlesService, TitlesUpdate],
  exports: [TitlesService],
})
export class TitlesModule {}
