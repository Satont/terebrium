import { Injectable } from '@nestjs/common';
import { logger } from '../modules/logger';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(id: number) {
    try {
      await this.prismaService.chat.create({
        data: {
          id,
        },
      });
    } catch (e) {
      if (e.code !== 'P2002') {
        logger.error(e, e.stack);
      }
    }
  }
}
