import { Controller, Get, Query, Req } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf, Context } from 'telegraf';
import { TwitchService } from '../twitch/twitch.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly twitchService: TwitchService,
    private readonly service: AuthService,
    @InjectBot() private readonly bot: Telegraf<Context>,
  ) {}

  @Get('callback')
  async callback(@Req() req: FastifyRequest, @Query('code') code: string, @Query('state') state: string) {
    const channelId = this.service.getChannelIdByState(state);
    const channel = await this.service.saveChannel(code, state);
    await this.bot.telegram.sendMessage(channelId, `Channel ${channel.name} successfuly added to your account.`);
    return 'You may close this window now.';
  }
}
