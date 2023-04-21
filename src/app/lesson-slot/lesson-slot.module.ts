import { Module } from '@nestjs/common';
import { LessonSlotService } from './lesson-slot.service';
import { LessonSlotResolver } from './lesson-slot.resolver';

@Module({
  providers: [LessonSlotResolver, LessonSlotService]
})
export class LessonSlotModule {}
