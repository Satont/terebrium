import { Action, Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { Markup, Scenes } from 'telegraf';
import { CategoriesService } from '../../categories/categories.service';
import { ChannelsService } from '../channels.service';
import * as constants from '../channels.constants';
import { ResponseTimeInterceptor } from '../../commons/response-time.interceptor';
import { UseInterceptors } from '@nestjs/common';

@Scene(constants.CHANGE_CHANNEL_CATEGORY)
@UseInterceptors(ResponseTimeInterceptor)
export class ChangeChannelCategoryScene {
  constructor(private readonly service: ChannelsService, private readonly categoriesService: CategoriesService) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: Scenes.SceneContext) {
    const channelId = (ctx.scene.state as any).channelId;
    const categories = await this.categoriesService.getChatCategories(ctx.chat.id);
    const keyboard = Markup.inlineKeyboard(categories.map((c) => Markup.button.callback(c.value, `SET_CATEGORY_${c.value}`)));

    await ctx.reply(`Changing category for channel ${channelId}`, keyboard);
  }

  @Action(new RegExp('SET_CATEGORY_.+'))
  setCategory(@Ctx() ctx: Scenes.SceneContext & { match: RegExpExecArray }) {
    const categoryName = ctx.match[0].replace('SET_CATEGORY_', '');
    // const [categoryId, categoryName] = ctx.match[1].split('-');
    return `${categoryName}`;
  }
}
