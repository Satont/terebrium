import { HttpService, Injectable } from '@nestjs/common';
import { TwitchChannel } from '@prisma/client';
import { firstValueFrom } from 'rxjs';
import config from '../../modules/config';
import { PrismaService } from '../prisma/prisma.service';
import { TwitchService } from '../twitch/twitch.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly twitchService: TwitchService,
  ) {}

  getChannelIdByState(state: string) {
    const { chatId } = JSON.parse(Buffer.from(state, 'base64').toString('binary')) as { chatId: number };

    return chatId;
  }

  async saveChannel(code: string, state: string) {
    const request = this.httpService.post<{ access_token: string; refresh_token: string }>(
      `https://id.twitch.tv/oauth2/token?client_id=${config.twitch.clientId}&client_secret=${config.twitch.clientSecret}&code=${code}&grant_type=authorization_code&redirect_uri=${this.twitchService.redirectUrl}`,
    );

    const {
      data: { access_token, refresh_token },
    } = await firstValueFrom(request);
    const chatId = this.getChannelIdByState(state);

    const {
      data: { login, user_id },
    } = await firstValueFrom(
      this.httpService.get<{ login: string; user_id: string }>('https://id.twitch.tv/oauth2/validate', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        responseType: 'json',
      }),
    );

    let channel: TwitchChannel = await this.prisma.twitchChannel.findFirst({
      where: {
        name: login,
        chatId,
      },
    });
    if (!channel) {
      channel = await this.prisma.twitchChannel.create({
        data: {
          name: login,
          id: user_id,
          chat: {
            connect: {
              id: chatId,
            },
          },
          accessToken: access_token,
          refreshToken: refresh_token,
        },
      });
    }

    return channel;
  }
}
