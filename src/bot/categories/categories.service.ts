import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}

  getChatCategories(chatId: number) {
    return this.prismaService.category.findMany({
      where: {
        chatId,
      },
    });
  }
}
