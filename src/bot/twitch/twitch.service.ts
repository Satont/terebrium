import { Injectable, OnModuleInit } from '@nestjs/common';
import { ApiClient } from 'twitch';
import { ClientCredentialsAuthProvider } from 'twitch-auth';
import config from '../../modules/config';

@Injectable()
export class TwitchService implements OnModuleInit {
  private readonly authProvider = new ClientCredentialsAuthProvider(config.twitch.clientId, config.twitch.clientSecret);
  private readonly twitch = new ApiClient({ authProvider: this.authProvider });

  async onModuleInit() {
    //await this.twitch.requestScopes(['channel:manage:broadcast']);
  }

  get redirectUrl() {
    return `${config.app.siteUrl}/auth/callback`;
  }

  get helix() {
    return this.twitch.helix;
  }

  get api() {
    return this.twitch;
  }

  get kraken() {
    return this.twitch.kraken;
  }
}
