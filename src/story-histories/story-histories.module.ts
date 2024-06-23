import { Module } from '@nestjs/common';
import { StoryHistoriesController } from './story-histories.controller';
import { StoryHistoriesService } from './story-histories.service';

@Module({
  controllers: [StoryHistoriesController],
  providers: [StoryHistoriesService]
})
export class StoryHistoriesModule {}
