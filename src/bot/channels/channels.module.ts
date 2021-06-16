import { forwardRef, Module } from '@nestjs/common';
import { ChannelsUpdate } from './channels.update';
import { ChannelsService } from './channels.service';
import { ChangeChannelTitleScene } from './scenes/title';
import { ChangeChannelCategoryScene } from './scenes/category';
import { PrismaModule } from '../prisma/prisma.module';
import { CategoriesModule } from '../categories/categories.module';
import { TitlesModule } from '../titles/titles.module';

@Module({
  imports: [PrismaModule, CategoriesModule, forwardRef(() => TitlesModule)],
  providers: [ChannelsUpdate, ChannelsService, ChangeChannelTitleScene, ChangeChannelCategoryScene],
  exports: [ChannelsService],
})
export class ChannelsModule {}
