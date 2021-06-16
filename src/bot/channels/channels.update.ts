import { UseInterceptors } from '@nestjs/common';
import { Update, Ctx, Command, Action } from 'nestjs-telegraf';
import { Context, Markup, Scenes } from 'telegraf';
import { ResponseTimeInterceptor } from '../commons/response-time.interceptor';
import * as constants from './channels.constants';
import { ChannelsService } from './channels.service';

@Update()
@UseInterceptors(ResponseTimeInterceptor)
export class ChannelsUpdate {
  constructor(private readonly service: ChannelsService) {}

  @Command('channels')
  start(@Ctx() ctx: Context) {
    return this.service.sendChannelsKeyboard(ctx);
  }

  @Action('CHANNELS')
  channelsAction(@Ctx() ctx: Context) {
    return this.service.sendChannelsKeyboard(ctx, true);
  }

  @Action(constants.CHANNEL_EDIT_REGEXP)
  async onChannelEdit(@Ctx() ctx: Context & { match: RegExpExecArray }) {
    const matchedBy = ctx.match[0].replace(constants.CHANNEL_EDIT, '');
    await ctx.editMessageReplyMarkup(
      Markup.inlineKeyboard(
        [
          Markup.button.callback('Change title', `${constants.CHANGE_CHANNEL_TITLE}${matchedBy}`),
          Markup.button.callback('Change category', `${constants.CHANGE_CHANNEL_CATEGORY}${matchedBy}`),
          Markup.button.callback('Delete', `${constants.CHANNEL_DELETE}${matchedBy}`),
          Markup.button.callback('«', 'CHANNELS'),
        ],
        { columns: 2 },
      ).reply_markup,
    );
    await ctx.answerCbQuery();
  }

  @Action(constants.CHANNEL_DELETE_REGEXP)
  async deleteChannel(@Ctx() ctx: Context & { match: RegExpExecArray }) {
    const matchedBy = ctx.match[0].replace(constants.CHANNEL_DELETE, '');

    await this.service.deleteChannel(ctx.chat.id, matchedBy);
    await this.service.sendChannelsKeyboard(ctx, true);
  }

  @Action(constants.CHANNEL_CHANGE_TITLE_REGEXP)
  changeTitle(@Ctx() ctx: Scenes.SceneContext & { match: RegExpExecArray }) {
    const channelId = ctx.match[0].replace(constants.CHANGE_CHANNEL_TITLE, '');
    ctx.scene.enter(constants.CHANGE_CHANNEL_TITLE, {
      channelId,
    });
  }

  @Action(constants.CHANNEL_CHANGE_CATEGORY_REGEXP)
  changeCategory(@Ctx() ctx: Scenes.SceneContext & { match: RegExpExecArray }) {
    const channelId = ctx.match[0].replace(constants.CHANGE_CHANNEL_CATEGORY, '');
    ctx.scene.enter(constants.CHANGE_CHANNEL_CATEGORY, {
      channelId,
    });
  }
}
