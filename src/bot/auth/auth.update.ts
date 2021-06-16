import { UseInterceptors } from '@nestjs/common';
import { Command, Ctx, Update } from 'nestjs-telegraf';
import { Context, Markup } from 'telegraf';
import config from '../../modules/config';
import { ResponseTimeInterceptor } from '../commons/response-time.interceptor';
import { TwitchService } from '../twitch/twitch.service';

@Update()
@UseInterceptors(ResponseTimeInterceptor)
export class AuthUpdate {
  private readonly neededScopes: string[] = ['user:edit:broadcast'];

  constructor(private readonly twitchService: TwitchService) {}

  @Command('addchannel')
  async addChannel(@Ctx() ctx: Context) {
    const redirectURl = this.twitchService.redirectUrl;
    const state = Buffer.from(JSON.stringify({ chatId: ctx.chat.id }), 'binary').toString('base64');
    const loginUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${
      config.twitch.clientId
    }&redirect_uri=${redirectURl}&response_type=code&scope=${this.neededScopes.join(' ')}&state=${state}`;

    ctx.reply('Click on the button for the login', Markup.inlineKeyboard([Markup.button.url('Login', loginUrl)]));
  }
}
