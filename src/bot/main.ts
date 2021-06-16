import { NestFactory } from '@nestjs/core';
import config from '../modules/config';
import { logger } from '../modules/logger';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

export async function bootstrapBot() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  await app.listen(config.app.port, '0.0.0.0');
  logger.log(`Application listened on ${config.app.port} port.`);
}
