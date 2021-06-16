import { UseInterceptors } from '@nestjs/common';
import { Action, Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { Markup, Scenes } from 'telegraf';
import { ResponseTimeInterceptor } from '../../commons/response-time.interceptor';
import { TitlesService } from '../../titles/titles.service';
import * as constants from '../channels.constants';
import { ChannelsService } from '../channels.service';

@Scene(constants.CHANGE_CHANNEL_TITLE)
@UseInterceptors(ResponseTimeInterceptor)
export class ChangeChannelTitleScene {
  constructor(private readonly service: ChannelsService, private readonly titleService: TitlesService) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: Scenes.SceneContext) {
    const titles = await this.titleService.getChatTitles(ctx.chat.id);
    const keyboard = Markup.inlineKeyboard(
      titles.map((c) => Markup.button.callback(c.value, `SET_TITLE_${c.value}`)),
      { columns: 2 },
    );

    await ctx.reply(`You can shoose title from presets or enter new one.`, keyboard);
    await ctx.answerCbQuery();
  }

  @Action(new RegExp('SET_TITLE_.+'))
  async setTitleByAction(@Ctx() ctx: Scenes.SceneContext & { match: RegExpExecArray }) {
    const value = ctx.match[0].replace('SET_TITLE_', '');
    const result = await this.titleService.setTitle(ctx.chat.id, value, (ctx.scene.state as any).channelId);

    await ctx.scene.leave();
    await ctx.answerCbQuery();
    return result;
  }

  @On('text')
  @UseInterceptors(ResponseTimeInterceptor)
  async onMessage(@Ctx() ctx: Scenes.SceneContext) {
    if ('text' in ctx.message) {
      const value = ctx.message.text;

      const result = await this.titleService.setTitle(ctx.chat.id, value, (ctx.scene.state as any).channelId);

      await ctx.scene.leave();
      return result;
    }
  }
}
