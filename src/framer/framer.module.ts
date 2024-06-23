import { Module } from '@nestjs/common';
import { FramerService } from './framer.service';
import { FramerController } from './framer.controller';

@Module({
  providers: [FramerService],
  controllers: [FramerController]
})
export class FramerModule {}
