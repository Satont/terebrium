import { HttpModule, Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TwitchModule } from '../twitch/twitch.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthUpdate } from './auth.update';

@Module({
  imports: [TwitchModule, PrismaModule, HttpModule],
  controllers: [AuthController],
  providers: [AuthService, AuthUpdate],
})
export class AuthModule {}
