import 'source-map-support/register';

import dotenv from 'dotenv';
import { bootstrapBot } from './bot/main';
dotenv.config();

async function bootstrap() {
  await bootstrapBot();
}

bootstrap();
