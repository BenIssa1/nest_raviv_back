import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from './mailer/mailer.module';
import { StorytellerModule } from './storyteller/storyteller.module';
import { FramerModule } from './framer/framer.module';
import { StudentModule } from './student/student.module';
import { TaleModule } from './tale/tale.module';
import { StoryHistoriesModule } from './story-histories/story-histories.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, AuthModule, MailerModule, StorytellerModule, FramerModule, StudentModule, TaleModule, StoryHistoriesModule],
})
export class AppModule {}
