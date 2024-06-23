import { Module } from '@nestjs/common';
import { StorytellerService } from './storyteller.service';
import { StorytellerController } from './storyteller.controller';

@Module({
  providers: [StorytellerService],
  controllers: [StorytellerController]
})
export class StorytellerModule {}
