import { Module } from '@nestjs/common';
import { CategoriesUpdate } from './categories.update';
import { CategoriesService } from './categories.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CategoriesUpdate, CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
