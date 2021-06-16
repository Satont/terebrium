import { BotCommand } from 'telegraf/typings/core/types/typegram';

export const commands: readonly BotCommand[] = [
  {
    command: 'start',
    description: 'Start command',
  },
  {
    command: 'channels',
    description: 'Created channels',
  },
  {
    command: 'addchannel',
    description: 'Add new twitch channel',
  },
];
