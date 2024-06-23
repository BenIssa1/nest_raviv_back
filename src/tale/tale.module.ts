import { Module } from '@nestjs/common';
import { TaleController } from './tale.controller';
import { TaleService } from './tale.service';

@Module({
  controllers: [TaleController],
  providers: [TaleService]
})
export class TaleModule {}
