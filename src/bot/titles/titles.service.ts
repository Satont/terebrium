import { Injectable } from '@nestjs/common';
import { ApiClient } from 'twitch';
import { ChannelsService } from '../channels/channels.service';
import { PrismaService } from '../prisma/prisma.service';
import { TwitchService } from '../twitch/twitch.service';

@Injectable()
export class TitlesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly twitchService: TwitchService,
    private readonly channelsService: ChannelsService,
  ) {}

  async setTitle(chatId: number, value: string, channelId: string) {
    const title =
      (await this.prismaService.title.findFirst({ where: { value } })) ||
      (await this.prismaService.title.create({ data: { chatId, value } }));

    const channel = await this.prismaService.twitchChannel.findFirst({ where: { id: channelId } });
    const authProvider = await this.channelsService.createChannelProvider(channel);
    const apiClient = new ApiClient({ authProvider });

    await apiClient.helix.channels.updateChannelInfo(channelId, { title: title.value });

    //await this.twitchService.helix.channels.updateChannelInfo(channelId, { title: value });
    return `Title of ${channel.name} was updated to ${title.value}`;
  }

  getChatTitles(chatId: number) {
    return this.prismaService.title.findMany({ where: { chatId } });
  }
}
