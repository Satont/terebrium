import { UseInterceptors } from '@nestjs/common';
import { Update, Ctx, Start, InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { logger } from '../modules/logger';
import { AppService } from './app.service';
import { ResponseTimeInterceptor } from './commons/response-time.interceptor';

@Update()
@UseInterceptors(ResponseTimeInterceptor)
export class AppController {
  constructor(private readonly service: AppService, @InjectBot() private bot: Telegraf<Context>) {}

  async onModuleInit() {
    const me = await this.bot.telegram.getMe();
    logger.log(`Logged in telegram as ${me.username}`);

    await this.bot.telegram.setMyCommands([
      {
        command: '/start',
        description: 'Start command',
      },
      {
        command: '/channels',
        description: 'Created channels',
      },
    ]);
  }

  @Start()
  async start(@Ctx() ctx: Context) {
    await this.service.createUser(ctx.chat.id);
    await ctx.reply('Welcome');
  }
}
