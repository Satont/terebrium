import { Injectable } from '@nestjs/common';
import { TwitchChannel } from '@prisma/client';
import { Context, Markup } from 'telegraf';
import { RefreshableAuthProvider, StaticAuthProvider } from 'twitch-auth';
import config from '../../modules/config';

import { CategoriesService } from '../categories/categories.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChannelsService {
  constructor(private readonly categoriesService: CategoriesService, private readonly prismaService: PrismaService) {}

  async createChannelProvider(channel: TwitchChannel) {
    const authProvider = new RefreshableAuthProvider(new StaticAuthProvider(config.twitch.clientId, channel.accessToken), {
      clientSecret: config.twitch.clientSecret,
      refreshToken: channel.refreshToken,
      onRefresh: async ({ accessToken, refreshToken }) => {
        await this.prismaService.twitchChannel.update({
          where: {
            id: channel.id,
          },
          data: {
            accessToken,
            refreshToken,
          },
        });
      },
    });

    return authProvider;
  }

  async sendChannelsKeyboard(ctx: Context, isAction = false) {
    const channels = await this.getChannelsByChatId(ctx.chat.id);
    const keyboard = Markup.inlineKeyboard(
      channels.map((c) => Markup.button.callback(c.name, `CHANNEL_EDIT${c.id}`)),
      { columns: 2 },
    );

    if (isAction) {
      await ctx.editMessageReplyMarkup(keyboard.reply_markup);
      await ctx.answerCbQuery();
    } else {
      await ctx.reply('Your channels', keyboard);
    }
  }

  async getChannelsByChatId(id: number) {
    const chat = await this.prismaService.chat.findFirst({
      where: { id },
      include: { twitchChannels: true },
    });

    return chat?.twitchChannels ?? [];
  }

  deleteChannel(chatId: number, channelId: string) {
    return this.prismaService.twitchChannel.deleteMany({
      where: {
        id: channelId,
        chatId,
      },
    });
  }

  async setTitle(chatId: number, value: string) {
    const title =
      (await this.prismaService.title.findFirst({ where: { value } })) ||
      (await this.prismaService.title.create({ data: { chatId, value } }));

    return title;
  }
}
