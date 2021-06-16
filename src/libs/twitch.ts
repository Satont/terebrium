import { ApiClient } from 'twitch';
import { ClientCredentialsAuthProvider } from 'twitch-auth';
import config from '../modules/config';

const authProvider = new ClientCredentialsAuthProvider(config.twitch.clientId, config.twitch.clientSecret);
export const twitch = new ApiClient({ authProvider });
